# In accounts/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User
from goals.models import Goal  # Import the Goal model from your goals app
from datetime import date, timedelta

@receiver(post_save, sender=User)
def create_default_goals(sender, instance, created, **kwargs):
    """
    This function is called every time a User object is saved.
    We only run it if the user is being created for the first time.
    """
    if created:
        # Create a "Lose 5 kg" goal for the new user
        Goal.objects.create(
            user=instance,
            title='Lose 5 kg',
            description='A starting goal for weight management through diet and exercise.',
            category='weight_loss',
            priority='medium',
            target_value=5,
            current_value=0,
            unit='kg',
            deadline=date.today() + timedelta(days=90)
        )

        # Create a "Consistency" goal for the new user
        Goal.objects.create(
            user=instance,
            title='Workout 3 times a week',
            description='Build a consistent workout habit for the first month.',
            category='consistency',
            priority='high',
            target_value=12,  # 3 workouts/week for 4 weeks
            current_value=0,
            unit='workouts',
            deadline=date.today() + timedelta(days=30)
        )

        
        

# ========== CONSISTENCY GOALS ==========
    Goal.objects.create(
        user=instance,
        title='Workout 3 times a week',
        description='Build a consistent workout habit for the first month.',
        category='consistency',
        priority='high',
        target_value=12,  # 3 workouts/week for 4 weeks
        current_value=0,
        unit='workouts',
        deadline=date.today() + timedelta(days=30)
    )

    Goal.objects.create(
        user=instance,
        title='Complete 20 workouts in 2 months',
        description='Maintain steady consistency over 8 weeks.',
        category='consistency',
        priority='medium',
        target_value=20,
        current_value=0,
        unit='workouts',
        deadline=date.today() + timedelta(days=60)
    )

    Goal.objects.create(
        user=instance,
        title='Workout daily for 2 weeks',
        description='Build the habit of moving every single day.',
        category='consistency',
        priority='high',
        target_value=14,
        current_value=0,
        unit='workouts',
        deadline=date.today() + timedelta(days=14)
    )

    Goal.objects.create(
        user=instance,
        title='Track workouts for 30 days straight',
        description='Stay accountable by logging every session.',
        category='consistency',
        priority='medium',
        target_value=30,
        current_value=0,
        unit='logs',
        deadline=date.today() + timedelta(days=30)
    )

    Goal.objects.create(
        user=instance,
        title='Never miss a Monday workout for 2 months',
        description='Stay disciplined by starting each week with fitness.',
        category='consistency',
        priority='medium',
        target_value=8,
        current_value=0,
        unit='workouts',
        deadline=date.today() + timedelta(days=60)
    )

    # ========== WEIGHT LOSS GOALS ==========
    Goal.objects.create(
        user=instance,
        title='Burn 10,000 calories this month',
        description='Aim to create a calorie deficit with regular workouts.',
        category='weight_loss',
        priority='high',
        target_value=10000,
        current_value=0,
        unit='calories',
        deadline=date.today() + timedelta(days=30)
    )

    Goal.objects.create(
        user=instance,
        title='Lose 2 kg in 6 weeks',
        description='Gradually reduce weight with a mix of cardio and diet.',
        category='weight_loss',
        priority='high',
        target_value=2,
        current_value=0,
        unit='kg',
        deadline=date.today() + timedelta(days=42)
    )

    Goal.objects.create(
        user=instance,
        title='Jog 50 km in a month',
        description='Increase calorie burn through consistent cardio.',
        category='weight_loss',
        priority='medium',
        target_value=50,
        current_value=0,
        unit='km',
        deadline=date.today() + timedelta(days=30)
    )

    Goal.objects.create(
        user=instance,
        title='Do 500 burpees in 30 days',
        description='High-intensity workouts to boost calorie expenditure.',
        category='weight_loss',
        priority='medium',
        target_value=500,
        current_value=0,
        unit='burpees',
        deadline=date.today() + timedelta(days=30)
    )

    Goal.objects.create(
        user=instance,
        title='Cut waist size by 2 inches in 3 months',
        description='Track fat loss progress through waist circumference.',
        category='weight_loss',
        priority='high',
        target_value=2,
        current_value=0,
        unit='inches',
        deadline=date.today() + timedelta(days=90)
    )

    # ========== STRENGTH GOALS ==========
    Goal.objects.create(
        user=instance,
        title='Do 50 push-ups in one set',
        description='Improve upper body strength and endurance.',
        category='strength',
        priority='high',
        target_value=50,
        current_value=0,
        unit='push-ups',
        deadline=date.today() + timedelta(days=60)
    )

    Goal.objects.create(
        user=instance,
        title='Deadlift 100 kg',
        description='Increase strength and improve lifting capacity.',
        category='strength',
        priority='high',
        target_value=100,
        current_value=0,
        unit='kg',
        deadline=date.today() + timedelta(days=90)
    )

    Goal.objects.create(
        user=instance,
        title='Bench press 70 kg',
        description='Build chest and tricep strength.',
        category='strength',
        priority='medium',
        target_value=70,
        current_value=0,
        unit='kg',
        deadline=date.today() + timedelta(days=90)
    )

    Goal.objects.create(
        user=instance,
        title='Perform 20 pull-ups in a row',
        description='Develop back and arm strength with bodyweight training.',
        category='strength',
        priority='high',
        target_value=20,
        current_value=0,
        unit='pull-ups',
        deadline=date.today() + timedelta(days=75)
    )

    Goal.objects.create(
        user=instance,
        title='Squat bodyweight for 15 reps',
        description='Enhance lower body strength and stability.',
        category='strength',
        priority='medium',
        target_value=15,
        current_value=0,
        unit='reps',
        deadline=date.today() + timedelta(days=60)
    )

    # ========== ENDURANCE GOALS ==========
    Goal.objects.create(
        user=instance,
        title='Run 5 km without stopping',
        description='Build cardiovascular endurance and stamina.',
        category='endurance',
        priority='medium',
        target_value=5,
        current_value=0,
        unit='km',
        deadline=date.today() + timedelta(days=45)
    )

    Goal.objects.create(
        user=instance,
        title='Cycle 100 km in one month',
        description='Enhance lower body strength and aerobic capacity.',
        category='endurance',
        priority='medium',
        target_value=100,
        current_value=0,
        unit='km',
        deadline=date.today() + timedelta(days=30)
    )

    Goal.objects.create(
        user=instance,
        title='Swim 2 km in 1 hour',
        description='Boost endurance and full-body stamina through swimming.',
        category='endurance',
        priority='high',
        target_value=2,
        current_value=0,
        unit='km',
        deadline=date.today() + timedelta(days=60)
    )

    Goal.objects.create(
        user=instance,
        title='Complete a 10 km run',
        description='Train for longer distances with pacing strategy.',
        category='endurance',
        priority='high',
        target_value=10,
        current_value=0,
        unit='km',
        deadline=date.today() + timedelta(days=75)
    )

    Goal.objects.create(
        user=instance,
        title='Row 20,000 meters in 6 weeks',
        description='Increase full-body endurance with rowing machine training.',
        category='endurance',
        priority='medium',
        target_value=20000,
        current_value=0,
        unit='meters',
        deadline=date.today() + timedelta(days=42)
    )