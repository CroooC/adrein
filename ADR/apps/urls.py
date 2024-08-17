from django.urls import path
from . import views

urlpatterns = [
    path('qrcode/', views.qrcode, name='qrcode'),
    path('movie-theatre/', views.movietheatre, name='movie-theatre'),
    path('yt2mp3/', views.yt2mp3, name='yt2mp3'),
    path('quote/', views.quote_generator, name='quote-generator'),
]
