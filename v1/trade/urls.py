from django.urls import path

from .views.buy import BuyStock
from .views.sell import SellStock

urlpatterns = [
    path('buy/', BuyStock.as_view(), name='buy-stock'),
    path('sell/', SellStock.as_view(), name='sell-stock')
]
