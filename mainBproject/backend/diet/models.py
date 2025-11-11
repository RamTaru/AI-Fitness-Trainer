# diet/models.py

from django.db import models
from django.conf import settings

class DietLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    meal_name = models.CharField(max_length=100)
    calories = models.PositiveIntegerField()
    protein_g = models.FloatField(default=0)
    carbs_g = models.FloatField(default=0)
    fat_g = models.FloatField(default=0)
    date = models.DateField()


class Meal(models.Model):
    MEAL_TYPE_CHOICES = [
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
        ('snack', 'Snack'),
    ]
    name = models.CharField(max_length=100)
    meal_type = models.CharField(max_length=20, choices=MEAL_TYPE_CHOICES)
    calories = models.PositiveIntegerField()
    protein_g = models.FloatField()
    carbs_g = models.FloatField()
    fat_g = models.FloatField()
    ingredients = models.TextField()
    instructions = models.TextField()

    def __str__(self):
        return f"{self.get_meal_type_display()}: {self.name}"

class MealPlan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    meals = models.ManyToManyField(Meal)
    
    # Store the calculated targets for this plan
    target_calories = models.PositiveIntegerField()
    target_protein_g = models.PositiveIntegerField()
    target_carbs_g = models.PositiveIntegerField()
    target_fat_g = models.PositiveIntegerField()

    class Meta:
        unique_together = ('user', 'date') # A user can only have one plan per day

    def __str__(self):
        return f"Meal Plan for {self.user.email} on {self.date}"