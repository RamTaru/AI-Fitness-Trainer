# In logbook/views.py
from rest_framework import generics, permissions
from .models import ExerciseLog
from .serializers import ExerciseLogSerializer

class ExerciseLogCreateView(generics.CreateAPIView):
    serializer_class = ExerciseLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)