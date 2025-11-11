# In diet/admin.py

from django.contrib import admin
from .models import DietLog, Meal, MealPlan

@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ('name', 'meal_type', 'calories', 'protein_g', 'carbs_g', 'fat_g')
    list_filter = ('meal_type',)
    search_fields = ('name', 'ingredients')

# We can also register the other models for visibility
admin.site.register(DietLog)
admin.site.register(MealPlan)