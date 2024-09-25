"""
Django settings for ADR project.

Generated by 'django-admin startproject' using Django 4.2.9.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import os
import environ
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
env = environ.Env()
environ.Env.read_env()
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

ALLOWED_HOSTS = [
    '127.0.0.1',

    'adrein.pythonanywhere.com',
    'adreinn.eu.pythonanywhere.com',

    'adrein.onrender.com',
    ]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'easy_thumbnails',
    'imagekit',

    'facade',
    'games',
    'apps',
    'functionalities'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ADR.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ADR.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# import dj_database_url

# DATABASES = {
#     'default': dj_database_url.config(default='postgres://localhost')
# }


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
    'django.contrib.auth.hashers.BCryptPasswordHasher',
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'apps/static'),
    os.path.join(BASE_DIR, 'facade/static'),
    os.path.join(BASE_DIR, 'functionalities/static'),
    os.path.join(BASE_DIR, 'games/static'),
]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Email

# Gmail settings
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = env('GMAIL_ADDRESS')
EMAIL_HOST_PASSWORD = env('GMAIL_PASSWORD')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


# Thumbnails

THUMBNAIL_ALIASES = {
    '': {
        'small': {'size': (100, 100), 'crop': True},
        'medium': {'size': (300, 200), 'crop': True},
    },
}


# Media

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# HTTP / Cookies

SECURE_COOKIE = True
SESSION_COOKIE_HTTPONLY = True
HTTPONLY_COOKIE = True


# X-Frame Options

X_FRAME_OPTIONS = 'DENY'


# Ensure security and force HTTPS

SECURE_SSL_REDIRECT = False  # Redirect all HTTP requests to HTTPS
SESSION_COOKIE_SECURE = True  # Use HTTPS for session cookies
CSRF_COOKIE_SECURE = True     # Use HTTPS for CSRF cookies

SECURE_HSTS_SECONDS = 31536000  # Enable HSTS (1 year)
SECURE_HSTS_INCLUDE_SUBDOMAINS = True  # Apply HSTS to subdomains
SECURE_HSTS_PRELOAD = True  # Preload HSTS
SECURE_BROWSER_XSS_FILTER = True  # Enable the browser's XSS filter
SECURE_CONTENT_TYPE_NOSNIFF = True  # Prevent the browser from interpreting files as a different MIME type


# Weather API
WEATHER_API_KEY = env('WEATHER_API_KEY')


# Groq API
GROQ_API_KEY = env('GROQ_API_KEY')


# PDF Upload directory
# PDF_UPLOAD_DIR = 'uploads/pdfs/'


# Loggings

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
    },
    'loggers': {
        'django.security': {
            'handlers': ['console'],
            'level': 'INFO',
        },
    }
}
