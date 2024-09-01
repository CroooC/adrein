import environ

from django.shortcuts import render

env = environ.Env()
environ.Env.read_env(env.str('ENV_FILE', '.env'))

# Create your views here.

def qrcode(request):
    return render(request, 'apps/qrcode.html')

def quote_generator(request):
    return render(request, 'apps/quote.html')

def weather(request):
    api_key = env('WEATHER_API_KEY')
    return render(request, 'apps/weather.html', {'api_key': api_key})
