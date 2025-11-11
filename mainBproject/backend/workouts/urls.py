# workouts/urls.py

from django.urls import path
from .views import WorkoutListView, WorkoutLogCreateView, WorkoutCreateView, ExerciseListView, WorkoutDetailView


urlpatterns = [
    path('', WorkoutListView.as_view(), name='workout-list'),
    path('create/', WorkoutCreateView.as_view(), name='workout-create'), 
    path('log/', WorkoutLogCreateView.as_view(), name='workout-log-create'),
    path('exercises/', ExerciseListView.as_view(), name='exercise-list'),
    path('<int:pk>/', WorkoutDetailView.as_view(), name='workout-detail'),
]