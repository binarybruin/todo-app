from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from apps.todo.models import Task

class TaskResource(ModelResource):
    class Meta:
        queryset = Task.objects.all()
        authentication = Authentication()
        authorization = Authorization()
