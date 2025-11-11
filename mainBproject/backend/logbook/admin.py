from django.contrib import admin
from .models import ExerciseLog

@admin.register(ExerciseLog)
class ExerciseLogAdmin(admin.ModelAdmin):
    """
    Customizes how Exercise Logs are displayed in the Django admin.
    """
    list_display = ('exercise_name', 'user', 'reps_completed', 'date')
    list_filter = ('date', 'exercise_name', 'user')
    search_fields = ('exercise_name', 'user__email')