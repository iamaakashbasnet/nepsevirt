from rest_framework import generics
from rest_framework import permissions

from v1.portfolio.serializers.portfolio import PortfolioStockSerializer
from v1.portfolio.models import Portfolio, PortfolioStock


class ListPortfolioStocks(generics.ListAPIView):
    serializer_class = PortfolioStockSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PortfolioStock.objects.filter(
            portfolio=Portfolio.objects.get(user=self.request.user))
