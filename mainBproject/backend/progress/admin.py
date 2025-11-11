from django.contrib import admin
from .models import Progress

@admin.register(Progress)
class ProgressAdmin(admin.ModelAdmin):
    """
    Customizes how Progress records are displayed in the Django admin.
    """
    list_display = ('date', 'user', 'weight_kg', 'calories_consumed', 'workout_completed', 'workouts_completed_count')
    list_filter = ('date', 'user')
    search_fields = ('user__email',)