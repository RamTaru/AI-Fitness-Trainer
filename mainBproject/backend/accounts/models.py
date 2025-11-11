from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # We don't need a separate name field, AbstractUser has first_name and last_name.
    # We'll map the 'name' from the form to these.
    email = models.EmailField(unique=True) # Make email the unique identifier
    age = models.PositiveIntegerField(null=True, blank=True)
    weight_kg = models.FloatField(null=True, blank=True)
    height_cm = models.FloatField(null=True, blank=True)
    SEX_CHOICES = [('male', 'Male'), ('female', 'Female')]
    sex = models.CharField(max_length=6, choices=SEX_CHOICES, null=True, blank=True)
    

    FITNESS_GOAL_CHOICES = [
        ('weight_loss', 'Weight Loss'),
        ('muscle_gain', 'Muscle Gain'),
        ('endurance', 'Improve Endurance'),
        ('general_fitness', 'General Fitness'),
    ]
    fitness_goal = models.CharField(max_length=20, choices=FITNESS_GOAL_CHOICES, null=True, blank=True)

    ACTIVITY_LEVEL_CHOICES = [
        ('sedentary', 'Sedentary'),
        ('lightly_active', 'Lightly Active'),
        ('moderately_active', 'Moderately Active'),
        ('very_active', 'Very Active'),
        ('extremely_active', 'Extremely Active'),
    ]
    activity_level = models.CharField(max_length=20, choices=ACTIVITY_LEVEL_CHOICES, null=True, blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] # 'username' is still required by Django admin, but we'll use email to log in.