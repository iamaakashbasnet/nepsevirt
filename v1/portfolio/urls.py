from django.urls import path

from .views.listportfolio import ListPortfolioStocks

urlpatterns = [
    path('list-stocks/', ListPortfolioStocks.as_view(), name='list-stocks'),
]
