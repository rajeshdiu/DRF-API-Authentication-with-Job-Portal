from .models import *
from rest_framework import serializers
        
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class JobModelSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = JobModel
        fields = "__all__"
        

class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()  # Must be SerializerMethodField

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'User_Type', 'profile_image', 'phone_number', 'bio']

    def get_profile_image(self, obj):
        request = self.context.get('request')
        if obj.profile_image:
            return request.build_absolute_uri(obj.profile_image.url)
        return None
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'User_Type']

    def create(self, validated_data):
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            User_Type=validated_data.get('User_Type')
        )
        return user

class LoginResponseSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField()
    user = UserSerializer()
