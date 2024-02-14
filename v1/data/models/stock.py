from django.db import models
from django.db import models


class StockName(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name}"


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
