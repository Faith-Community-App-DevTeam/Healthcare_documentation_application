from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home_view(request):
    # Render the HTML template index.html
    return HttpResponse("<h1>Testing homepage </h1>")