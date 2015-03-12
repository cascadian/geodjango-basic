from django.conf.urls import patterns, url, include
from world import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.DefaultRouter()
router.register(r'borders', views.BorderViewSet)
router.register(r'buffered-borders', views.BufferedBorderViewSet)
router.register(r'states', views.StateViewSet)

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))

)
