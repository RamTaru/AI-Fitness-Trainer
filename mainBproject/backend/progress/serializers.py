# In progress/serializers.py
from rest_framework import serializers
from .models import Progress

class ProgressSerializer(serializers.ModelSerializer):
    # Rename fields to match frontend's camelCase
    weight = serializers.FloatField(source='weight_kg')
    bodyFat = serializers.FloatField(source='body_fat_percent')
    muscle = serializers.FloatField(source='muscle_mass_kg')
    workoutCompleted = serializers.BooleanField(source='workout_completed')
    caloriesConsumed = serializers.IntegerField(source='calories_consumed')
    workoutsCompletedCount = serializers.IntegerField(source='workouts_completed_count')
    class Meta:
        model = Progress
        fields = ['date', 'weight', 'bodyFat', 'muscle', 'workoutCompleted', 'caloriesConsumed', 'workoutsCompletedCount']