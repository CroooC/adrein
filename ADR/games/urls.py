from django.urls import path
from . import views

urlpatterns = [
    # Mini Games
    path('blackjack/', views.blackjack, name='blackjack'),
    path('hangman/', views.hangman, name='hangman'),
    path('guess/', views.guess_nb, name='guess_nb'),
    path('dodger/', views.dodger, name='dodger'),
    path('worm/', views.worm, name='worm'),
    path('tetris/', views.tetris, name='tetris'),
    path('bonneteau/', views.bonneteau, name='bonneteau'),

    # MuliPlayer Games
    path('tictactoe/', views.tictactoe, name='tictactoe'),
    path('pong/', views.pong, name='pong')
]
