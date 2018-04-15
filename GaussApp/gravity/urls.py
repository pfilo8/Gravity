from django.urls import path

from . import views

urlpatterns = [
    path('api/', views.api, name='api'),
    path('rcmd/', views.rcmd, name='rcmd'),
    path('', views.index, name='index'),
]