from django.db import models

# Create your models here.
class StockData(models.Model):
    name = models.CharField(max_length=100)


