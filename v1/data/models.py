from django.db import models


class StockName(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"


class StockData(models.Model):
    name = models.OneToOneField(StockName, on_delete=models.CASCADE, primary_key=True, unique=True)
    open = models.FloatField()
    high = models.FloatField()
    low  = models.FloatField()
    close = models.FloatField()

    def __str__(self):
        return f"{self.name.name}"


