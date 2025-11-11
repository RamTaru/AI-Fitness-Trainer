# diet/serializers.py

from rest_framework import serializers
from .models import DietLog, Meal, MealPlan 

class DietLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = DietLog
        fields = '__all__'
        read_only_fields = ['user'] # User will be set automatically from the request

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = '__all__'

class MealPlanSerializer(serializers.ModelSerializer):
    meals = MealSerializer(many=True, read_only=True)

    class Meta:
        model = MealPlan
        fields = '__all__'