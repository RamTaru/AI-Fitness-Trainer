# diet/urls.py

from django.urls import path
from .views import DietLogListCreateView, MealPlanView

urlpatterns = [
    path('logs/', DietLogListCreateView.as_view(), name='diet-log-list-create'),
    path('plan/', MealPlanView.as_view(), name='meal-plan'),
]
