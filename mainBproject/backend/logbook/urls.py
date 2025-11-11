# In logbook/urls.py
from django.urls import path
from .views import ExerciseLogCreateView

urlpatterns = [
    path('exercise/', ExerciseLogCreateView.as_view(), name='log-exercise'),
]