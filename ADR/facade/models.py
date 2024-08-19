from django.db import models
from django.urls import reverse

class Game(models.Model):
    class Genre(models.TextChoices):
        ACTION = 'AC'
        AVENTURE = 'AV'
        ARCADE = 'AR'
        PLATFORMER = 'PL'
        OTHER = 'OT'

    name = models.CharField(max_length=100)
    genre = models.CharField(choices=Genre.choices, max_length=5)
    description = models.CharField(max_length=1000)
    active = models.BooleanField(default=True)
    link = models.fields.URLField(null=True, blank=True)
    thumbnail = models.ImageField(upload_to='img/thumbnail/')

    def __str__(self):
        return f'{self.name}'

    def get_absolute_url(self):
        return reverse('game-detail', kwargs={'id': self.id})

class Multi_Player(models.Model):
    class Genre(models.TextChoices):
        ACTION = 'AC'
        AVENTURE = 'AV'
        ARCADE = 'AR'
        PLATFORMER = 'PL'
        OTHER = 'OT'

    name = models.CharField(max_length=100)
    genre = models.CharField(choices=Genre.choices, max_length=5)
    description = models.CharField(max_length=1000)
    active = models.BooleanField(default=True)
    link = models.fields.URLField(null=True, blank=True)
    thumbnail = models.ImageField(upload_to='img/thumbnail/')

    def __str__(self):
        return f'{self.name}'

    def get_absolute_url(self):
        return reverse('multi-game-detail', kwargs={'id': self.id})

class Functionality(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    active = models.BooleanField(default=True)
    link = models.fields.URLField(null=True, blank=True)
    thumbnail = models.ImageField(upload_to='img/thumbnail/')

    def __str__(self):
        return f'{self.name}'

    def get_absolute_url(self):
        return reverse('functionality-detail', kwargs={'id': self.id})

class App(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    active = models.BooleanField(default=True)
    link = models.fields.URLField(null=True, blank=True)
    thumbnail = models.ImageField(upload_to='img/thumbnail/')

    def __str__(self):
        return f'{self.name}'

    def get_absolute_url(self):
        return reverse('app-detail', kwargs={'id': self.id})
