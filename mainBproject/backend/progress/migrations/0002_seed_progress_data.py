# In progress/migrations/0002_seed_progress_data.py
from django.db import migrations
from datetime import date, timedelta
import random

def create_sample_progress(apps, schema_editor):
    User = apps.get_model('accounts', 'User')
    Progress = apps.get_model('progress', 'Progress')

    # --- IMPORTANT: CHANGE THIS TO YOUR USER'S ID ---
    # Find your user ID by logging into the admin panel and viewing your user account.
    # The URL will be something like /admin/accounts/user/1/change/ (the ID is 1).
    try:
        user = User.objects.get(id=1)
    except User.DoesNotExist:
        # If the user doesn't exist, just skip this migration
        return

    # Generate 30 days of sample data
    for i in range(30):
        current_date = date.today() - timedelta(days=i)
        Progress.objects.create(
            user=user,
            date=current_date,
            weight_kg=round(75 - (i * 0.1) + (random.random() - 0.5), 1),
            calories_consumed=random.randint(1800, 2500),
            workout_completed=random.choice([True, False]),
            body_fat_percent=round(20 - (i * 0.05) + (random.random() - 0.5), 1),
            muscle_mass_kg=round(50 + (i * 0.02) + (random.random() * 0.2), 1),
        )

class Migration(migrations.Migration):
    dependencies = [
        ('progress', '0001_initial'),
        ('accounts', '0001_initial'), # Ensure user model is available
    ]
    operations = [
        migrations.RunPython(create_sample_progress),
    ]