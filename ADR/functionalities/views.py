from django.shortcuts import render
from django.conf import settings

# Create your views here.

def quirky_hover(request):
    return render(request, 'functionalities/quirky_hover.html')

def fake_error(request):
    return render(request, 'functionalities/fake_error.html')

def goldberg(request):
    return render(request, 'functionalities/goldberg.html')
