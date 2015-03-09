from django.conf.urls import patterns, include, url
from django.contrib.gis import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'geotutorial.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^world/', include('world.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
