from __future__ import unicode_literals
from django.db import transaction
from django.db import models

# Create your models here.
class Server(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50)

class Resource(models.Model):
    protocol = models.CharField(max_length=10)
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name="resources")
    port = models.IntegerField()
    domain = models.CharField(max_length=50)
    method = models.CharField(max_length=10)

    @transaction.atomic
    def save(self, *args, **kwargs):
        super(Resource, self).save(*args, **kwargs)

class PathParam(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name="pathParams")
    name = models.CharField(max_length=100)

class QueryParam(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name="queryParams")
    name = models.CharField(max_length=100)
    optional = models.BooleanField(default=False)
