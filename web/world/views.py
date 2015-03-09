from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    context = { 'title': "A working title", 'message': "Hello, world. You're at the worlds index view"}
    return render(request, 'world/index.html', context)
