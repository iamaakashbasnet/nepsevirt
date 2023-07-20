from django.db import models

# Create your models here.
class StockData(models.Model):
    name = models.CharField(max_length=100)
    open = models.FloatField()
    high = models.FloatField()
    low  = models.FloatField()
    close = models.FloatField()


