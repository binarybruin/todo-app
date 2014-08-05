from django.db import models

class Task(models.Model):
    task_name = models.CharField(max_length=200)
    status = models.CharField(max_length=10)
