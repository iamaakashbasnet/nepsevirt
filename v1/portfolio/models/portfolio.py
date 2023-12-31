from django.db import models
from django.contrib.auth import get_user_model

from v1.data.models import StockName


class Portfolio(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    stocks = models.ManyToManyField(StockName, through='Position')

    def __str__(self) -> str:
        return f"{self.user.firstname} {self.user.lastname}'s portfolio"
