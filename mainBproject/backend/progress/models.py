# In progress/models.py
from django.db import models
from django.conf import settings

class Progress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='progress_records')
    date = models.DateField()
    weight_kg = models.FloatField(null=True, blank=True)
    calories_consumed = models.PositiveIntegerField(default=0)
    workout_completed = models.BooleanField(default=False)
    workouts_completed_count = models.PositiveIntegerField(default=0)
    
    # NOTE: These fields are for demonstration, as we don't have a source for this data.
    # In a real app, this might come from a smart scale or manual user input.
    body_fat_percent = models.FloatField(null=True, blank=True)
    muscle_mass_kg = models.FloatField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'date') # One record per user per day
        ordering = ['date']

    def __str__(self):
        return f"Progress for {self.user.email} on {self.date}"