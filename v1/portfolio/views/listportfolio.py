from decimal import Decimal
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response

from v1.portfolio.serializers.portfolio import PortfolioStockSerializer
from v1.portfolio.models import Portfolio, PortfolioStock
from v1.data.models import StockData


class ListPortfolioStocks(generics.ListAPIView):
    serializer_class = PortfolioStockSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PortfolioStock.objects.filter(
            portfolio=Portfolio.objects.get(user=self.request.user))

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        res = super().list(request=request).data

        # Convert total_investment values to Decimal before summing
        total_investment_values = [
            Decimal(stock['total_investment']) for stock in serializer.data]

        for _ in res:
            _['current_worth'] = StockData.objects.get(
                id=_['stock']['id']).ltp * _['total_quantity']

        current_worth_values = [
            stock['current_worth'] for stock in res]

        modified_res = {
            "portfolio_worth": sum(current_worth_values),
            "portfolio_investment": sum(total_investment_values),
            "portfolio": res
        }
        return Response(modified_res)
