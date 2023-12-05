from rest_framework import generics

from v1.trade.serializers.portfoliostocks import PortfolioStockSerializer
from v1.portfolio.models import Portfolio, PortfolioStock


class BuyStock(generics.CreateAPIView):
    serializer_class = PortfolioStockSerializer

    def perform_create(self, serializer):
        serializer.validated_data['portfolio'] = Portfolio.objects.filter(
            user=self.request.user)[0]
        serializer.save()
