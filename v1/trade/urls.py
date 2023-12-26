from django.urls import path

from .views.buy import Buy
from .views.sell import Sell

urlpatterns = [
    path('buy/', Buy.as_view(), name='buy-stock'),
    path('sell/', Sell.as_view(), name='sell-stock')
]
