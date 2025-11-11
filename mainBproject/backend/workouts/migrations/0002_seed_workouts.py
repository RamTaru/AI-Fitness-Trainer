# In workouts/migrations/0002_seed_workouts.py

from django.db import migrations

def create_initial_workouts(apps, schema_editor):
    Exercise = apps.get_model('workouts', 'Exercise')
    Workout = apps.get_model('workouts', 'Workout')
    WorkoutExercise = apps.get_model('workouts', 'WorkoutExercise')

    # --- Create Exercises ---
    push_up = Exercise.objects.create(name='Push-up', instructions='...', target_muscles='Chest, Shoulders, Triceps')
    squat = Exercise.objects.create(name='Squat', instructions='...', target_muscles='Quads, Glutes, Hamstrings')
    plank = Exercise.objects.create(name='Plank', instructions='...', target_muscles='Core')
    lunge = Exercise.objects.create(name='Lunge', instructions='...', target_muscles='Quads, Glutes')
    
    db_row = Exercise.objects.create(name='Dumbbell Row', instructions='...', target_muscles='Back, Biceps')
    db_press = Exercise.objects.create(name='Dumbbell Bench Press', instructions='...', target_muscles='Chest, Shoulders, Triceps')
    goblet_squat = Exercise.objects.create(name='Goblet Squat', instructions='...', target_muscles='Quads, Glutes, Core')

    # --- Create Workouts ---
    bw_beginner = Workout.objects.create(name='Bodyweight Beginner', description='...', category='bodyweight', difficulty='beginner', duration_minutes=20)
    db_fullbody = Workout.objects.create(name='Dumbbell Full Body', description='...', category='dumbbell', difficulty='intermediate', duration_minutes=30)

    # --- Link Exercises to Workouts ---
    WorkoutExercise.objects.create(workout=bw_beginner, exercise=squat, order=1, sets=3, reps=12, rest_time_seconds=60)
    WorkoutExercise.objects.create(workout=bw_beginner, exercise=push_up, order=2, sets=3, reps=10, rest_time_seconds=60)
    WorkoutExercise.objects.create(workout=bw_beginner, exercise=lunge, order=3, sets=3, reps=10, rest_time_seconds=60)
    WorkoutExercise.objects.create(workout=bw_beginner, exercise=plank, order=4, sets=3, duration_seconds=30, reps=1, rest_time_seconds=60)

    WorkoutExercise.objects.create(workout=db_fullbody, exercise=goblet_squat, order=1, sets=3, reps=12, rest_time_seconds=90)
    WorkoutExercise.objects.create(workout=db_fullbody, exercise=db_press, order=2, sets=3, reps=10, rest_time_seconds=90)
    WorkoutExercise.objects.create(workout=db_fullbody, exercise=db_row, order=3, sets=3, reps=10, rest_time_seconds=90)


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_workouts),
    ]