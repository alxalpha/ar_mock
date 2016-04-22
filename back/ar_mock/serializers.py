from rest_framework import serializers
from models import Server, Resource, PathParam, QueryParam
from models import Resource

class ServerSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        obj = super(ServerSerializer, self).to_representation(instance)
        obj['nbResources'] = len(instance.resources.all())
        return obj

    class Meta:
        model = Server
        fields = ('id', 'name', 'description',)

class ReferenceSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField(allow_blank=True)

class QueryParamSerializer(serializers.ModelSerializer):
    class Meta:
        model = QueryParam
        fields = ('id', 'name', 'optional')

class PathParamSerializer(serializers.ModelSerializer):
    class Meta:
        model = PathParam
        fields = ('id', 'name',)



class ResourceSerializer(serializers.ModelSerializer):

    pathParams = PathParamSerializer(read_only=False, many=True,)
    queryParams = QueryParamSerializer(read_only=False, many=True,)

    def to_internal_value(self, data):
        ret = super(ResourceSerializer, self).to_internal_value(data)
        return ret

    def to_representation(self, instance):
        obj = super(ResourceSerializer, self).to_representation(instance)
        server = ReferenceSerializer(instance=instance.server)

        obj['server'] = server.data
        #obj['nbMocks'] = len(instance.mocks.all())
        return obj

    def create(self, validated_data):
        query_params = validated_data.pop('queryParams')
        path_params = validated_data.pop('pathParams')
        resource = Resource.objects.create(**validated_data)
        for currentQueryParam in query_params:
            QueryParam.objects.create(resource=resource, **currentQueryParam)
        for currentPathParam in path_params:
            PathParam.objects.create(resource=resource, **currentPathParam)
        return resource

    class Meta:
        model = Resource
        fields = ('server','protocol', 'id', 'port', 'domain', 'method', 'pathParams', 'queryParams')
