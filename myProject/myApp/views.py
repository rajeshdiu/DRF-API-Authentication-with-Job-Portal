from django.shortcuts import render

from rest_framework import status,response,mixins,generics,permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from .serializers import *

class MyJobList(generics.ListAPIView):
    serializer_class = JobModelSerializers

    def get_queryset(self):
        user = self.request.user
        if user.User_Type == 'Recruiter':
            return JobModel.objects.filter(Recruiter=user)
        return JobModel.objects.all()
    


class JobListCreateView(generics.ListCreateAPIView):
    serializer_class = JobModelSerializers
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        
        return JobModel.objects.all()

    def perform_create(self, serializer):
        serializer.save(Recruiter=self.request.user)


class JobRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobModel.objects.all()
    serializer_class = JobModelSerializers
    permission_classes = [permissions.IsAuthenticated]
    
    

User = get_user_model()

class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_users = User.objects.all().count()
        total_recruiters = User.objects.filter(User_Type='Recruiter').count()
        return Response({
            "total_users": total_users,
            "total_recruiters": total_recruiters
        })

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny] 


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)



class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user, context={'request': request})  # important
        return Response(serializer.data)


class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data

        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.phone_number = data.get('phone_number', user.phone_number)
        user.bio = data.get('bio', user.bio)
        user.User_Type = data.get('User_Type', user.User_Type)

        # Handle profile image
        if 'profile_image' in request.FILES:
            user.profile_image = request.FILES['profile_image']

        user.save()
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)





