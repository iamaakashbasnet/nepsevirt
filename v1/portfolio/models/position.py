from django.db import models

from v1.portfolio.models import Portfolio
from v1.data.models import StockName


POSITION_CHOICES = [
    ('LONG', 'Long'),
    ('SHORT', 'Short'),
]


class Position(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    stock = models.ForeignKey(StockName, on_delete=models.CASCADE)
    side = models.CharField(
        max_length=5, choices=POSITION_CHOICES, default='LONG')
    quantity = models.PositiveIntegerField(default=0)
    average_fill_price = models.DecimalField(
        default=0.00, max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return f'{self.stock.name} by {self.portfolio.user.firstname} {self.portfolio.user.lastname}'
