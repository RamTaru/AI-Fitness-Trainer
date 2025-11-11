# # diet/utils.py
# from .models import Meal
# import random

# def calculate_tdee(user):
#     # Mifflin-St Jeor Equation for BMR
#     if not all([user.weight_kg, user.height_cm, user.age]):
#         return 2200 # Return a default if profile is incomplete

#     bmr = (10 * user.weight_kg) + (6.25 * user.height_cm) - (5 * user.age) + 5 # Male formula for simplicity

#     activity_multipliers = {
#         'sedentary': 1.2, 'lightly_active': 1.375, 'moderately_active': 1.55,
#         'very_active': 1.725, 'extremely_active': 1.9
#     }
#     multiplier = activity_multipliers.get(user.activity_level, 1.55)
#     tdee = bmr * multiplier

#     # Adjust for fitness goal
#     if user.fitness_goal == 'weight_loss':
#         return tdee - 500
#     elif user.fitness_goal == 'muscle_gain':
#         return tdee + 500
#     else: # General fitness
#         return tdee

# def get_macro_targets(tdee, goal):
#     # Simple macro split (can be made more complex)
#     protein_g = (tdee * 0.3) / 4
#     carbs_g = (tdee * 0.4) / 4
#     fat_g = (tdee * 0.3) / 9
#     return {'calories': tdee, 'protein': protein_g, 'carbs': carbs_g, 'fat': fat_g}

# def generate_daily_meal_plan(user):
#     tdee = calculate_tdee(user)
#     macros = get_macro_targets(tdee, user.fitness_goal)

#     # Simple meal selection logic (can be improved)
#     meals = {
#         'breakfast': list(Meal.objects.filter(meal_type='breakfast')),
#         'lunch': list(Meal.objects.filter(meal_type='lunch')),
#         'dinner': list(Meal.objects.filter(meal_type='dinner')),
#         'snack': list(Meal.objects.filter(meal_type='snack')),
#     }

#     if not all(meals.values()):
#         return None # Not enough meals in the database to generate a plan

#     plan_meals = [
#         random.choice(meals['breakfast']),
#         random.choice(meals['lunch']),
#         random.choice(meals['dinner']),
#         random.choice(meals['snack']),
#     ]
    
#     return {'meals': plan_meals, 'targets': macros}


from .models import Meal
import random

def calculate_tdee(user):
    # Mifflin-St Jeor Equation for BMR
    if not all([user.weight_kg, user.height_cm, user.age, user.sex]):
        return 2200 # Return a default if profile is incomplete

    # Use the correct formula based on the user's sex
    if user.sex == 'male':
        bmr = (10 * user.weight_kg) + (6.25 * user.height_cm) - (5 * user.age) + 5
    else: # 'female'
        bmr = (10 * user.weight_kg) + (6.25 * user.height_cm) - (5 * user.age) - 161

    activity_multipliers = {
        'sedentary': 1.2, 'lightly_active': 1.375, 'moderately_active': 1.55,
        'very_active': 1.725, 'extremely_active': 1.9
    }
    multiplier = activity_multipliers.get(user.activity_level, 1.55)
    tdee = bmr * multiplier

    # Adjust for fitness goal
    if user.fitness_goal == 'weight_loss':
        return tdee - 500
    elif user.fitness_goal == 'muscle_gain':
        return tdee + 500
    else: # General fitness
        return tdee

def get_macro_targets(tdee, goal):
    # Simple macro split (can be made more complex)
    protein_g = (tdee * 0.3) / 4
    carbs_g = (tdee * 0.4) / 4
    fat_g = (tdee * 0.3) / 9
    return {'calories': tdee, 'protein': protein_g, 'carbs': carbs_g, 'fat': fat_g}

def generate_daily_meal_plan(user):
    tdee = calculate_tdee(user)
    macros = get_macro_targets(tdee, user.fitness_goal)

    # Simple meal selection logic (can be improved)
    meals = {
        'breakfast': list(Meal.objects.filter(meal_type='breakfast')),
        'lunch': list(Meal.objects.filter(meal_type='lunch')),
        'dinner': list(Meal.objects.filter(meal_type='dinner')),
        'snack': list(Meal.objects.filter(meal_type='snack')),
    }

    if not all(meals.values()):
        return None # Not enough meals in the database to generate a plan

    plan_meals = [
        random.choice(meals['breakfast']),
        random.choice(meals['lunch']),
        random.choice(meals['dinner']),
        random.choice(meals['snack']),
    ]
    
    return {'meals': plan_meals, 'targets': macros}
