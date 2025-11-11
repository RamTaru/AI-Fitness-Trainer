# In progress/urls.py
from django.urls import path
from .views import ProgressListView

urlpatterns = [
    path('', ProgressListView.as_view(), name='progress-list'),
]