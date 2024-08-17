from django.shortcuts import render

# Create your views here.

def quirky_hover(request):
    return render(request, 'functionalities/quirky_hover.html')

def fake_error(request):
    return render(request, 'functionalities/fake_error.html')

def emoji_madness(request):
    return render(request, 'functionalities/emoji.html')

def ascii(request):
    return render(request, 'functionalities/ascii.html')

def goldberg(request):
    return render(request, 'functionalities/goldberg.html')
