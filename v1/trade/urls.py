from django.urls import path

from .views.buy import (
    BuyStock
)

urlpatterns = [
    path('buy/', BuyStock.as_view(), name='buy-stock'),
]
