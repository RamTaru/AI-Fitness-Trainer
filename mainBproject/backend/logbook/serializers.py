# In logbook/serializers.py
from rest_framework import serializers
from .models import ExerciseLog

class ExerciseLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseLog
        fields = '__all__'
        read_only_fields = ['user', 'date']