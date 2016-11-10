from django.db import models

# Create your models here.


class Secret(models.Model):
    user = models.ForeignKey('auth.User')
    body = models.TextField()
