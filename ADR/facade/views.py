import logging
import environ
import threading

from django import forms
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm
from django.core.mail import send_mail
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
from django.views.decorators.http import require_http_methods

from facade.forms import ContactUsForm
from .models import Game, Functionality, App, Multi_Player

logger = logging.getLogger('django.security')

env = environ.Env()
environ.Env.read_env(env.str('ENV_FILE', '.env'))

# Main pages

def index(request):
    games = Game.objects.all()
    multi_games = Multi_Player.objects.all()
    apps = App.objects.all()
    functionalities = Functionality.objects.all()

    return render(request, 'facade/index.html', {'game_list': games, 'multi_game_list': multi_games, 'app_list': apps, 'functionality_list': functionalities})

def about(request):
    return render(request, 'facade/about.html')

# Function to send emails asynchronously using threading
def send_email_async(subject, message, from_email, recipient_list):
    thread = threading.Thread(target=send_mail, args=(subject, message, from_email, recipient_list))
    thread.start()

def contact(request):
    if request.method == 'POST':
        form = ContactUsForm(request.POST)
        if form.is_valid():

            # Validate the email
            email_to = form.cleaned_data['email']
            email_validator = EmailValidator()
            try:
                email_validator(email_to)
            except ValidationError:
                # Handle invalid email address
                return render(request, 'error.html', {'error': 'Invalid email address'})

            # Prepare email content
            subject = f'Message from {form.cleaned_data["name"] or "Anonyme"} via ADR Contact Us form'
            message = form.cleaned_data['message']
            from_email = form.cleaned_data['email']
            recipient_list = ['4dr1nn@gmail.com']

            # Send email asynchronously
            send_email_async(subject, message, from_email, recipient_list)

            # Redirect to a confirmation page after email is sent
            return HttpResponseRedirect('/email-sent/')
        else:
            # Handle email sending error
            # return HttpResponse('Error sending email')
            return render(request, 'facade/contact.html', {'form': form, 'error': 'Invalid form submission'})
    else:
        form = ContactUsForm()
    return render(request, 'facade/contact.html', {'form': form})

def email_sent(request):
    return render(request, 'facade/email_sent.html')

def email_error(request):
    return render(request, 'facade/email_error.html')

def search_results(request):
    query = request.GET.get('q')
    # Process the search query and determine the appropriate page
    # Redirect the user to the corresponding page
    if query:
        game_results = Game.objects.filter(name__icontains=query)
        multi_game_results = Multi_Player.objects.filter(name__icontains=query)
        functionality_results = Functionality.objects.filter(name__icontains=query)
        app_results = App.objects.filter(name__icontains=query)

        # Combine the results from different models
        results = list(game_results) + list(multi_game_results) + list(functionality_results) + list(app_results)

        # Check for specific query
        if query == "HINT":
            # If the user searches for "HINT", return a specific message instead of results
            return render(request, 'facade/search_results.html', {
                'results': [],  # No results to show in the normal list
                'query': query,
                'hint_message': "You found the hint. Now I will test your knowledge."
            })
    else:
        results = []
    # If no specific category matches, you can handle it as needed
    return render(request, 'facade/search_results.html', {'results': results, 'query': query})

def congratulation(request):
    favicon_url = '/static/facade/favicon.ico'
    return render(request, 'facade/congratulation.html', {'reward': favicon_url})


# def login_view(request):
#     if request.method == 'POST':
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             login(request, user)
#             logger.info('User logged in successfully')
#             return redirect('home')
#         else:
#             logger.warning('Invalid login attempt')
#             return render(request, 'login.html', {'error': 'Invalid username or password'})


# Lists

def game_list(request):
    game_list = Game.objects.all()
    return render(request, 'facade/game_list.html', {'games': game_list})

def game_detail(request, id):
    game = get_object_or_404(Game, id=id)
    return render(request, 'facade/game_detail.html', {'game': game})

def multi_game_list(request):
    multi_game_list = Multi_Player.objects.all()
    return render(request, 'facade/multi_game_list.html', {'multi_games': multi_game_list})

def multi_game_detail(request, id):
    multi_game = get_object_or_404(Multi_Player, id=id)
    return render(request, 'facade/multi_game_detail.html', {'multi_game': multi_game})

def app_list(request):
    app_list = App.objects.all()
    return render(request, 'facade/app_list.html', {'apps': app_list})

def app_detail(request, id):
    app = get_object_or_404(App, id=id)
    return render(request, 'facade/app_detail.html', {'app': app})

def functionality_list(request):
    functionality_list = Functionality.objects.all()
    return render(request, 'facade/functionality_list.html', {'functionalities': functionality_list})

def functionality_detail(request, id):
    functionality = get_object_or_404(Functionality, id=id)
    return render(request, 'facade/functionality_detail.html', {'functionality': functionality})
