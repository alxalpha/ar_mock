from django.conf.urls import url
from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf import settings
from . import views

urlpatterns = [
    url(r'^api/resources/$', views.resourceList.as_view()),
    url(r'^api/servers/$', views.serverList.as_view()),
    url(r'^api/servers/(?P<pk>[0-9]+)/$', views.serverDetail.as_view()),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)