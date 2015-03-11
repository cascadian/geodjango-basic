from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    context = { 'title': "A working title", 'message': "Hello, world. You're at the worlds index view"}
    return render(request, 'world/index.html', context)

from models import WorldBorder
from djgeojson.serializers import Serializer as GeoJSONSerializer
from django.core.serializers import serialize
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from serializers import UserSerializer, GroupSerializer, BorderSerializer

# class BorderList(APIView):
#     def get(self, request, format=None):
#         borders = WorldBorder.objects.all()
#         serializer = GeoFeatureModelSerializer()
#         geojson = GeoJSONSerializer().serialize(borders, geometry_field='mpoly', use_natural_keys=True, properties=['name', 'pop2005'])
#         return Response(geojson)



class BorderViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = WorldBorder.objects.all()
    serializer_class = BorderSerializer



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
