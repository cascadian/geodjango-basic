from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    context = { 'title': "A working title", 'message': "Hello, world. You're at the worlds index view"}
    return render(request, 'world/index.html', context)

from models import WorldBorder, BufferedWorldBorder
from django.core.serializers import serialize
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from serializers import UserSerializer, GroupSerializer, BorderSerializer, BufferedBorderSerializer

class BorderViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows world borders to be viewed or edited.
    """
    queryset = WorldBorder.objects.filter(subregion=21)
    serializer_class = BorderSerializer

class BufferedBorderViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows world borders to be viewed or edited.
    """
    queryset = BufferedWorldBorder.objects.raw("""SELECT id, name,
                                        ST_BUFFER(mpoly, 1) as geom
                                        FROM world_worldborder
                                        WHERE name = 'United States'""")
    serializer_class = BufferedBorderSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
