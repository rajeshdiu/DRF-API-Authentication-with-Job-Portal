from django.contrib import admin
from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('job/JobList/', JobListCreateView.as_view(), name='job-list'),
    path('job/<int:pk>/', JobRetrieveUpdateDestroyView.as_view(), name='job-detail'),
    path('auth/dashboard-stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/update-profile/', UpdateProfileView.as_view(), name='update-profile'),
    
]
