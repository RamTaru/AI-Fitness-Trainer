# workouts/views.py

from rest_framework import generics, permissions
from .models import Workout, WorkoutLog, Exercise
from .serializers import WorkoutSerializer, WorkoutLogSerializer, WorkoutCreateSerializer, ExerciseSerializer
from .permissions import IsCreatorOrReadOnly

class WorkoutListView(generics.ListAPIView):
    """
    Lists all available workouts.
    Can be filtered by category query parameter, e.g., /api/workouts/?category=dumbbell
    """
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Workout.objects.prefetch_related('workoutexercise_set__exercise').all()
        category = self.request.query_params.get('category')
        if category and category != 'all':
            queryset = queryset.filter(category=category)
        return queryset

class ExerciseListView(generics.ListAPIView):
    """
    Lists all available exercises to populate the 'Add Exercise' dropdown.
    """
    queryset = Exercise.objects.all().order_by('name')
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkoutCreateView(generics.CreateAPIView):
    """
    Creates a new custom workout from the user's form data.
    """
    serializer_class = WorkoutCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
   
   # Add this method to set the user
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class WorkoutLogCreateView(generics.CreateAPIView):
    """
    Logs a completed workout for the authenticated user.
    """
    serializer_class = WorkoutLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WorkoutDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Handles retrieving, updating, and deleting a single workout.
    """
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated, IsCreatorOrReadOnly]        