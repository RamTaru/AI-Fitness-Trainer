# workouts/models.py

from django.db import models
from django.conf import settings

class Exercise(models.Model):
    name = models.CharField(max_length=100, unique=True)
    instructions = models.TextField()
    target_muscles = models.CharField(max_length=200) # e.g., "Chest, Triceps, Shoulders"
    video_url = models.CharField(max_length=200, null=True, blank=True)
    
    def __str__(self):
        return self.name

class Workout(models.Model):
    CATEGORY_CHOICES = [('bodyweight', 'Bodyweight'), ('dumbbell', 'Dumbbell')]
    DIFFICULTY_CHOICES = [('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')]

    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    difficulty = models.CharField(max_length=50, choices=DIFFICULTY_CHOICES)
    duration_minutes = models.PositiveIntegerField()
    exercises = models.ManyToManyField(Exercise, through='WorkoutExercise')

    # Add this field to track the creator
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='created_workouts'
    )
    
    def __str__(self):
        return self.name

class WorkoutExercise(models.Model):
    """ 'Through' model to link Workouts and Exercises with specific details """
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    sets = models.PositiveIntegerField()
    reps = models.PositiveIntegerField()
    duration_seconds = models.PositiveIntegerField(null=True, blank=True)
    rest_time_seconds = models.PositiveIntegerField()
    order = models.PositiveIntegerField(help_text="Order of the exercise in the workout")

    class Meta:
        ordering = ['order']

class WorkoutLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} completed {self.workout.name} on {self.date}"