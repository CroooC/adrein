from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse

# Mini Games

def blackjack(request):
    return render(request, 'games/blackjack.html', {'page_type': 'game'})

def hangman(request):
    return render(request, 'games/hangman.html', {'page_type': 'game'})

def dodger(request):
    return render(request, 'games/dodger.html', {'page_type': 'game'})

def worm(request):
    return render(request, 'games/worm.html', {'page_type': 'game'})

def tetris(request):
    return render(request, 'games/tetris.html', {'page_type': 'game'})

def bonneteau(request):
    return render(request, 'games/bonneteau.html', {'page_type': 'game'})

# MultiPlayer Games

def tictactoe(request):
    return render(request, 'games/tictactoe.html', {'page_type': 'multi_game'})

def pong(request):
    return render(request, 'games/pong.html', {'page_type': 'multi_game'})
