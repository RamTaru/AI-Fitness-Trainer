# In logbook/models.py
from django.db import models
from django.conf import settings

class ExerciseLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    exercise_name = models.CharField(max_length=100)
    reps_completed = models.PositiveIntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        user_name = self.user.first_name or self.user.username
        return f"{user_name} - {self.exercise_name}: {self.reps_completed} reps"
