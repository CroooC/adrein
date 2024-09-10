from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse

# Mini Games

def blackjack(request):
    return render(request, 'games/blackjack.html')

def hangman(request):
    return render(request, 'games/hangman.html')

def dodger(request):
    return render(request, 'games/dodger.html')

def worm(request):
    return render(request, 'games/worm.html')

def tetris(request):
    return render(request, 'games/tetris.html')

def bonneteau(request):
    return render(request, 'games/bonneteau.html')

# MultiPlayer Games

def tictactoe(request):
    return render(request, 'games/tictactoe.html')

def pong(request):
    return render(request, 'games/pong.html')
