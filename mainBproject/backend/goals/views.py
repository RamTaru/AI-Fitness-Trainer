# In goals/views.py
from rest_framework import viewsets, permissions
from .models import Goal
from .serializers import GoalSerializer

class GoalViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update`, and `destroy` actions for Goals.
    """
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all the goals
        for the currently authenticated user.
        """
        return self.request.user.goals.all().order_by('-created_at')

    def perform_create(self, serializer):
        """
        Assign the logged-in user to the new goal upon creation.
        """
        serializer.save(user=self.request.user)