from django.urls import path
from . import views

urlpatterns = [
    path('quirky_hover/', views.quirky_hover, name='quirky-hover'),
    path('error_page/', views.fake_error, name='fake-error'),
    path('revision/', views.revision_sheet_builder, name='revision_sheet_builder'),
]
