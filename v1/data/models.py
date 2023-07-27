from django.db import models
from django.conf import settings
from django.contrib.postgres.indexes import GinIndex


class StockName(models.Model):
    name = models.CharField(max_length=100)

    if settings.DEBUG is False:
        class Meta:
            ordering = ['name']
            indexes = [
                GinIndex(name='gin_index', fields=['name'])
            ]

    def __str__(self):
        return f"{self.name}"


class StockData(models.Model):
    name = models.OneToOneField(
        StockName, on_delete=models.CASCADE, unique=True)
    open = models.FloatField()
    high = models.FloatField()
    low = models.FloatField()
    close = models.FloatField()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name.name}"
