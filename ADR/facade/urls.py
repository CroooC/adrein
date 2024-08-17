from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('home/', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('email-sent/', views.email_sent, name='email-sent'),
    path('error/', views.error, name='error'),
    path('search-results/', views.search_results, name='search_results'),

    path('games/', views.game_list, name='game-list'),
    path('games/<int:id>/', views.game_detail, name='game-detail'),

    path('multi-games/', views.multi_game_list, name='multi-game-list'),
    path('multi-games/<int:id>/', views.multi_game_detail, name='multi-game-detail'),

    path('apps/', views.app_list, name='app-list'),
    path('apps/<int:id>/', views.app_detail, name='app-detail'),

    path('functionalities/', views.functionality_list, name='functionality-list'),
    path('functionalities/<int:id>/', views.functionality_detail, name='functionality-detail'),
]
