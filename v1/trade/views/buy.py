from decimal import Decimal
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from v1.trade.serializers.portfoliostocks import PortfolioStockSerializer
from v1.portfolio.models import Portfolio, PortfolioStock
from v1.data.models import StockName


class BuyStock(generics.GenericAPIView):
    serializer_class = PortfolioStockSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ltp = Decimal(StockName.objects.get(
            id=self.request.data.get('stock')).stockdata.ltp)
        quantity = self.request.data.get('quantity')

        portfolio_stock, created = PortfolioStock.objects.get_or_create(
            portfolio=Portfolio.objects.get(user=self.request.user),
            stock_id=self.request.data.get('stock'),
            defaults={'total_quantity': quantity,
                      'avg_cost': ltp,
                      'total_investment': quantity * ltp}
        )

        portfolio_stock.total_investment = round(
            portfolio_stock.total_investment, 2)
        portfolio_stock.avg_cost = round(portfolio_stock.avg_cost, 2)

        if not created:
            # Update existing PortfolioStock entry
            portfolio_stock.total_quantity += quantity
            portfolio_stock.total_investment += quantity * ltp
            portfolio_stock.avg_cost = (
                portfolio_stock.total_investment / portfolio_stock.total_quantity
            )

        portfolio_stock.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
