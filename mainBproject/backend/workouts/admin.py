# In workouts/admin.py

from django.contrib import admin
from .models import Workout, Exercise, WorkoutExercise

# This 'Inline' class makes it possible to add and edit exercises
# directly on the same page as the workout itself.
class WorkoutExerciseInline(admin.TabularInline):
    model = WorkoutExercise
    extra = 1 # This provides one extra empty slot for a new exercise.

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    # This customizes how the list of workouts is displayed.
    list_display = ('name', 'category', 'difficulty', 'duration_minutes')
    list_filter = ('category', 'difficulty')
    search_fields = ['name']
    
    # This adds the exercise editor to the workout page.
    inlines = [WorkoutExerciseInline]

@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    # This customizes the list of individual exercises.
    list_display = ('name', 'target_muscles')
    search_fields = ['name']

# We register WorkoutExercise as well, so it can be managed independently if needed.
admin.site.register(WorkoutExercise)