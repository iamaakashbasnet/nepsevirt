from django.urls import path

from .views.market import (
    IsMarketOpen,
)


urlpatterns = [
    path('is-market-open/', IsMarketOpen.as_view(), name='is-market-open'),
]
