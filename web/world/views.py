from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    context = { 'title': "World Borders", 'message': "A world map"}
    return render(request, 'world/index.html', context)

from django.db.models import Q
from models import WorldBorder, BufferedWorldBorder, State
from serializers import BorderSerializer, BufferedBorderSerializer, StateSerializer
from django.core.serializers import serialize
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

class BorderViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows world borders to be viewed or edited.
    """
    queryset = WorldBorder.objects.filter(Q(name='United States') | Q(name='Mexico'))
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


class StateViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows world borders to be viewed or edited.
    """
    queryset = State.objects.all()
    serializer_class = StateSerializer
