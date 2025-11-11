# # In progress/signals.py
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from django.utils import timezone
# from diet.models import DietLog
# from workouts.models import WorkoutLog
# from .models import Progress
# from django.db.models import Sum

# @receiver(post_save, sender=DietLog)
# def update_progress_from_diet(sender, instance, **kwargs):
#     user = instance.user
#     date = instance.date
    
#     # Calculate total calories for the day
#     total_calories = DietLog.objects.filter(user=user, date=date).aggregate(Sum('calories'))['calories__sum'] or 0
    
#     # Update or create the progress record
#     progress, created = Progress.objects.get_or_create(user=user, date=date)
#     progress.calories_consumed = total_calories
#     progress.save()

# @receiver(post_save, sender=WorkoutLog)
# def update_progress_from_workout(sender, instance, **kwargs):
#     user = instance.user
#     date = instance.date
    
#     progress, created = Progress.objects.get_or_create(user=user, date=date)
#     progress.workout_completed = True
    
#     # Also save the user's latest weight if available
#     if user.weight_kg:
#         progress.weight_kg = user.weight_kg
        
#     progress.save()
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from diet.models import DietLog
from workouts.models import WorkoutLog
from .models import Progress
from django.db.models import Sum

def get_or_create_progress_with_weight(user, date):
    """
    A helper function to find or create a progress record and ensure
    the weight is carried forward from the most recent entry.
    """
    progress, created = Progress.objects.get_or_create(user=user, date=date)

    # If the record's weight is not set, carry it forward
    if not progress.weight_kg:
        # First, try to get the most up-to-date weight from the user's main profile
        if user.weight_kg:
            progress.weight_kg = user.weight_kg
        else:
            # If not on profile, find the most recent previous progress record with a weight
            last_progress_with_weight = Progress.objects.filter(
                user=user, 
                date__lt=date, 
                weight_kg__isnull=False
            ).order_by('-date').first()
            
            if last_progress_with_weight:
                progress.weight_kg = last_progress_with_weight.weight_kg
    
    return progress

@receiver(post_save, sender=DietLog)
def update_progress_from_diet(sender, instance, **kwargs):
    """
    When a meal is logged, update the calorie count for that day's progress.
    """
    progress = get_or_create_progress_with_weight(instance.user, instance.date)
    
    # Calculate total calories for the day
    total_calories = DietLog.objects.filter(user=instance.user, date=instance.date).aggregate(Sum('calories'))['calories__sum'] or 0
    
    progress.calories_consumed = total_calories
    progress.save()

@receiver(post_save, sender=WorkoutLog)
def update_progress_from_workout(sender, instance, **kwargs):
    """
    When a workout is logged, update the progress record.
    """
    user = instance.user
    date = instance.date
    
    progress = get_or_create_progress_with_weight(user, date)
    
    # Mark that a workout was done on this day
    progress.workout_completed = True
    
    # Calculate the total number of workouts for this day
    workout_count = WorkoutLog.objects.filter(user=user, date=date).count()
    progress.workouts_completed_count = workout_count
    
    progress.save()