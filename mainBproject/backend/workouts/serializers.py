# workouts/serializers.py

from rest_framework import serializers
from .models import Workout, Exercise, WorkoutExercise, WorkoutLog

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name',  'target_muscles']

# This serializer defines the structure for each exercise added within the main form.
class WorkoutExerciseCreateSerializer(serializers.ModelSerializer):
    exercise_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = WorkoutExercise
        fields = ['exercise_id', 'sets', 'reps', 'duration_seconds', 'rest_time_seconds', 'order']

# This is the main serializer for the "Create Workout" form.
class WorkoutCreateSerializer(serializers.ModelSerializer):
    exercises = WorkoutExerciseCreateSerializer(many=True,write_only=True)
    duration_minutes = serializers.IntegerField()

    class Meta:
        model = Workout
        fields = ['name', 'description', 'category', 'difficulty', 'duration_minutes', 'exercises']

    def create(self, validated_data):
        # Pop the nested exercises data
        exercises_data = validated_data.pop('exercises')
        
        # Create the main Workout instance
        workout = Workout.objects.create(**validated_data)

        # Create the linking WorkoutExercise instances
        for exercise_data in exercises_data:
            exercise_id = exercise_data.pop('exercise_id')
            exercise_instance = Exercise.objects.get(id=exercise_id)
            WorkoutExercise.objects.create(workout=workout, exercise=exercise_instance, **exercise_data)
        
        return workout        

class WorkoutExerciseSerializer(serializers.ModelSerializer):
    # Nest the full exercise details
    exercise = ExerciseSerializer(read_only=True)
    
    # Rename fields to match frontend's camelCase if needed, but frontend can adapt
    muscleGroups = serializers.CharField(source='exercise.target_muscles', read_only=True)
    restTime = serializers.IntegerField(source='rest_time_seconds', read_only=True)
    duration = serializers.IntegerField(source='duration_seconds', read_only=True)
    name = serializers.CharField(source='exercise.name', read_only=True)
    instructions = serializers.CharField(source='exercise.instructions', read_only=True)
    videoUrl = serializers.CharField(source='exercise.video_url', read_only=True)

    class Meta:
        model = WorkoutExercise
        fields = ['name', 'sets', 'reps', 'duration', 'restTime', 'instructions', 'muscleGroups','exercise','videoUrl' ]
    
class WorkoutSerializer(serializers.ModelSerializer):
    # Use the nested serializer for the 'exercises' relationship
    exercises = WorkoutExerciseSerializer(source='workoutexercise_set', many=True, read_only=True)
    duration = serializers.IntegerField(source='duration_minutes')
    # created_by = serializers.IntegerField(source='created_by.id', read_only=True)
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'category', 'difficulty', 'duration', 'exercises', 'created_by']

class WorkoutLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutLog
        fields = ['id', 'workout', 'date']
        read_only_fields = ['user', 'date']