"""
ePitch - Home Application URL Routing (apps/home/urls.py)
"""

from django.urls import path
from . import views

app_name = 'home'

urlpatterns = [
    path('', views.home_dashboard, name='index'),
    path('api/state/', views.home_state_api, name='api_state'),
]
