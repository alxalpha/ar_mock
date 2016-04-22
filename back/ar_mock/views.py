from serializers import ServerSerializer
from serializers import ResourceSerializer
from models import Server, Resource
from rest_framework import generics


class resourceList(generics.ListCreateAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer


class serverList(generics.ListCreateAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer

class serverDetail(generics.RetrieveDestroyAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer