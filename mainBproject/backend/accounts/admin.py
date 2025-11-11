# # In accounts/admin.py

# from django.contrib import admin
# from .models import User

# admin.site.register(User)
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """
    Customizes the User model display in the Django admin panel.
    """
    # This adds your custom fields to the main user editing page
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Profile Data', {
            'fields': ('age', 'weight_kg', 'height_cm', 'sex', 'fitness_goal', 'activity_level'),
        }),
    )
    
    # This adds your custom fields to the user list display
    list_display = ('username', 'email', 'first_name', 'is_staff', 'sex')
