# diet/views.py

from rest_framework import generics, permissions,status
from .models import DietLog
from .serializers import DietLogSerializer, MealPlanSerializer
from datetime import date
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import DietLog, MealPlan # Add MealPlan
from .utils import generate_daily_meal_plan # Import the AI logic

class DietLogListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create diet logs for the authenticated user.
    """
    serializer_class = DietLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter logs by the authenticated user
        queryset = DietLog.objects.filter(user=self.request.user)
        
        # Optionally filter by date from query params (e.g., /api/diet/logs/?date=2025-08-18)
        log_date_str = self.request.query_params.get('date')
        if log_date_str:
            try:
                log_date = date.fromisoformat(log_date_str)
                queryset = queryset.filter(date=log_date)
            except ValueError:
                # Handle invalid date format if necessary
                pass
        
        return queryset.order_by('id')

    def perform_create(self, serializer):
        # Automatically assign the logged-in user to the diet log
        serializer.save(user=self.request.user)

class MealPlanView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """ Fetch an existing meal plan for a specific date. """
        plan_date_str = request.query_params.get('date')
        if not plan_date_str:
            return Response({"error": "Date parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            plan_date = date.fromisoformat(plan_date_str)
            meal_plan = MealPlan.objects.get(user=request.user, date=plan_date)
            serializer = MealPlanSerializer(meal_plan)
            return Response(serializer.data)
        except MealPlan.DoesNotExist:
            return Response({"error": "No meal plan found for this date."}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)


    def post(self, request, *args, **kwargs):
        """ Generate a new meal plan for a specific date. """
        plan_date_str = request.data.get('date')
        if not plan_date_str:
            return Response({"error": "Date is required to generate a plan."}, status=status.HTTP_400_BAD_REQUEST)
        
        plan_date = date.fromisoformat(plan_date_str)

        # Delete any existing plan for that day
        MealPlan.objects.filter(user=request.user, date=plan_date).delete()

        # Generate new plan
        generation_result = generate_daily_meal_plan(request.user)
        if generation_result is None:
            return Response({"error": "Could not generate a meal plan. Not enough meals in the database."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        new_plan = MealPlan.objects.create(
            user=request.user,
            date=plan_date,
            target_calories=generation_result['targets']['calories'],
            target_protein_g=generation_result['targets']['protein'],
            target_carbs_g=generation_result['targets']['carbs'],
            target_fat_g=generation_result['targets']['fat']
        )
        new_plan.meals.set(generation_result['meals'])
        
        serializer = MealPlanSerializer(new_plan)
        return Response(serializer.data, status=status.HTTP_201_CREATED)