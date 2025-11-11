from rest_framework.response import Response
from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from .serializers import RegisterSerializer, UserSerializer
from .models import User
from django.utils import timezone
from django.db.models import Sum
from diet.models import DietLog
from workouts.models import WorkoutLog 
from datetime import timedelta

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            user_data = serializer.data
            return Response({
                "user": user_data,
                "message": "User created successfully."
            }, status=status.HTTP_201_CREATED)
        
        # Customize error response to be a simple string
        error_messages = []
        for field, errors in serializer.errors.items():
            error_messages.append(f"{field.replace('_', ' ').title()}: {errors[0]}")
        
        return Response({"error": " ".join(error_messages)}, status=status.HTTP_400_BAD_REQUEST)
class UserProfileView(generics.RetrieveAPIView):
    """
    View to retrieve the profile of the currently authenticated user.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # This method returns the user instance that is associated with the request
        return self.request.user

# At the top, add Response to the DRF imports
from rest_framework.response import Response
# Also add APIView and permissions
from rest_framework.views import APIView
from rest_framework import permissions

# ... (Your other views are here) ...

# Add this new View at the bottom of the file
class DashboardView(APIView):
    """
    Provides data for the user's dashboard.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        today = timezone.now().date()
        
        # Calculate BMI
        bmi = None
        bmi_category = "N/A"
        if user.weight_kg and user.height_cm and user.height_cm > 0:
            height_in_meters = user.height_cm / 100
            bmi = round(user.weight_kg / (height_in_meters ** 2), 1)
            
            if bmi < 18.5:
                bmi_category = "Underweight"
            elif 18.5 <= bmi < 24.9:
                bmi_category = "Normal weight"
            elif 25 <= bmi < 29.9:
                bmi_category = "Overweight"
            else:
                bmi_category = "Obese"

 # Dynamic calorie calculation (no change)
        calories_today = DietLog.objects.filter(user=user, date=today).aggregate(Sum('calories'))['calories__sum'] or 0

        # DYNAMIC WORKOUT CALCULATION
        one_week_ago = today - timedelta(days=7)
        workouts_this_week = WorkoutLog.objects.filter(user=user, date__gte=one_week_ago).count()


        # Prepare the data payload
        data = {
            'currentWeight': user.weight_kg,
            'bmi': bmi,
            'bmiCategory': bmi_category,
            'caloriesToday': calories_today,
            'workoutsThisWeek': workouts_this_week,
        }
        
        return Response(data)
# In accounts/views.py (or any other views.py file)

from django.http import JsonResponse

def server_check(request):
    """
    A simple view to confirm that the server is running.
    """
    return JsonResponse({"status": "success", "message": "AI Fitness Trainer backend server is running correctly."})    