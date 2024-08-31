import environ

from django.shortcuts import render
from django.conf import settings

env = environ.Env()
environ.Env.read_env(env.str('ENV_FILE', '.env'))

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

def weather(request):
    api_key = env('WEATHER_API_KEY')
    return render(request, 'functionalities/weather.html', {'api_key': api_key})
