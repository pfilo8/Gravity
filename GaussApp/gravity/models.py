from django.db import models

class Company(models.Model):

    name = models.CharField(max_length=255)

    x = models.FloatField() #WE
    y = models.FloatField() #NS

    opinions = models.IntegerField()

    average_opinion = models.FloatField()

    def __str__(self):
        return self.name
