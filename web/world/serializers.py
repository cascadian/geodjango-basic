from django.contrib.auth.models import User, Group
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


from rest_framework_gis.serializers import GeoFeatureModelSerializer
from models import WorldBorder

class BorderSerializer(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """

    class Meta:
        model = WorldBorder
        geo_field = "mpoly"

        # you can also explicitly declare which fields you want to include
        # as with a ModelSerializer.
        fields = ('id', 'name', 'pop2005')        
