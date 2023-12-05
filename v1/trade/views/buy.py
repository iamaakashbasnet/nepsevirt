from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

from v1.trade.serializers.portfoliostocks import PortfolioStockSerializer
from v1.portfolio.models import Portfolio, PortfolioStock
from v1.data.models import StockName


class BuyStock(generics.CreateAPIView):
    serializer_class = PortfolioStockSerializer

    def perform_create(self, serializer):
        serializer.validated_data['portfolio'] = Portfolio.objects.get(
            user=self.request.user)
        serializer.validated_data['purchase_price'] = StockName.objects.get(
            id=self.request.data.get('stock')).stockdata.ltp

        serializer.save()
