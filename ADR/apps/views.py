from django.shortcuts import render

# Create your views here.

def qrcode(request):
    return render(request, 'apps/qrcode.html')

def movietheatre(request):
    return render(request, 'apps/movie-theatre.html')

def yt2mp3(request):
    return render(request, 'apps/yt2mp3.html')

def quote_generator(request):
    return render(request, 'apps/quote.html')
