from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    # Map 'name' from frontend to 'first_name' in our model
    name = serializers.CharField(write_only=True, source='first_name')

    class Meta:
        model = User
        fields = (
            'id', 
            'email', 
            'password', 
            'name', # from frontend
            'first_name', # to backend
            'age', 
            'weight_kg', 
            'height_cm', 
            'fitness_goal',
            'activity_level',
            'sex',
        )
        # Make first_name readable but not writable directly
        read_only_fields = ('first_name',)

    def create(self, validated_data):
        # The 'name' field is handled by source='first_name'
        # We also need to set the username, we can default it to the email
        validated_data['username'] = validated_data.get('email')
        
        # Hash the password
        validated_data['password'] = make_password(validated_data['password'])
        
       
        return super().create(validated_data)

class UserSerializer(serializers.ModelSerializer):
        isAdmin = serializers.BooleanField(source='is_staff', read_only=True)
        class Meta:
                model = User
                fields = ('id', 'email', 'first_name', 'age', 'weight_kg', 'height_cm', 'fitness_goal', 'activity_level','date_joined', 'isAdmin')           