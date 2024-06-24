from django.urls import path

from .views.market import (
    IsMarketOpen,
    LiveMarketData
)


urlpatterns = [
    path('is-market-open/', IsMarketOpen.as_view(), name='is-market-open'),
    path('live-market/', LiveMarketData.as_view(), name='live-market'),
]
