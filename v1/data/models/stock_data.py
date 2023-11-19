from django.db import models

from .stock_name import StockName


class StockData(models.Model):
    name = models.OneToOneField(StockName, on_delete=models.CASCADE)
    open = models.FloatField()
    high = models.FloatField()
    low = models.FloatField()
    close = models.FloatField()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name.name}"
