
from django.contrib import admin
from .models import Goal

@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
    """
    Customizes how Goals are displayed in the Django admin panel.
    """
    list_display = ('title', 'user', 'category', 'deadline', 'priority')
    list_filter = ('category', 'priority', 'user')
    search_fields = ('title', 'description', 'user__email')