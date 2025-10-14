from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = [
        ('Recruiter', 'Recruiter'),
        ('Seeker', 'Seeker'),
    ]

    User_Type = models.CharField(choices=USER_TYPE_CHOICES, max_length=20, null=True, blank=True)

    # Additional fields
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.username





class JobModel(models.Model):
    JOB =[
        ('FULLTIME','FULL-TIME'),
        ('PARTTIME','PART-TIME'),
    ]
    Recruiter = models.ForeignKey(CustomUser,null=True,on_delete=models.CASCADE)
    Job_Title = models.CharField(max_length=100, null=True)
    Job_Type = models.CharField(choices=JOB,max_length=100, blank=True, null=True)
    Job_Description = models.TextField(null=True)
    
    def __str__(self):
        return self.Job_Title
    