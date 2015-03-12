from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from models import WorldBorder, BufferedWorldBorder, State

class BorderSerializer(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """

    class Meta:
        model = WorldBorder
        geo_field = "mpoly"

        # you can also explicitly declare which fields you want to include
        # as with a ModelSerializer.
        fields = ('id', 'name', 'pop2005')

class BufferedBorderSerializer(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """

    class Meta:
        model = BufferedWorldBorder
        geo_field = "geom"

        # you can also explicitly declare which fields you want to include
        # as with a ModelSerializer.
        fields = ('id', 'name')

class StateSerializer(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """

    class Meta:
        model = State
        geo_field = "geom"

        # you can also explicitly declare which fields you want to include
        # as with a ModelSerializer.
        fields = ('id', 'state_name')
