from django.db import models

from .stock_name import StockName


class StockData(models.Model):
    name = models.OneToOneField(StockName, on_delete=models.CASCADE)
    ltp = models.FloatField(default='0.00')
    open = models.FloatField(default='0.00')
    high = models.FloatField(default='0.00')
    low = models.FloatField(default='0.00')
    close = models.FloatField(default='0.00')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name.name}"
