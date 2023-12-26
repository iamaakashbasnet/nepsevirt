from django.db import models

from .stock_name import StockName


class StockData(models.Model):
    name = models.OneToOneField(StockName, on_delete=models.CASCADE)
    ltp = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    open = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    high = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    low = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    close = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name.name}"
