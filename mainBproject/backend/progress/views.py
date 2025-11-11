# In progress/views.py
from rest_framework import generics, permissions
from .models import Progress
from .serializers import ProgressSerializer
from datetime import date, timedelta

class ProgressListView(generics.ListAPIView):
    serializer_class = ProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        days = int(self.request.query_params.get('days', 30))
        start_date = date.today() - timedelta(days=days-1)
        
        return Progress.objects.filter(user=user, date__gte=start_date).order_by('date')