from django.urls import path
from .views import get_products# Импортируем функции напрямую

urlpatterns = [
    path('products/', get_products),
]