from django import forms

class ContactUsForm(forms.Form):
    name = forms.CharField(max_length=50, required=False, widget=forms.TextInput(attrs={'placeholder': 'Your Name'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'Your Email'}))
    message = forms.CharField(max_length=1000, widget=forms.Textarea(attrs={'placeholder': 'Your Message'}))
