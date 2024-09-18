from django.urls import path
from . import views

urlpatterns = [
    path('qrcode/', views.qrcode, name='qrcode'),
    path('quote/', views.quote_generator, name='quote-generator'),
    path('weather/', views.weather, name='weather'),
    path('cipher/', views.cipher, name='cipher'),
]
