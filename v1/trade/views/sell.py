from rest_framework import generics, status
from rest_framework.response import Response

from v1.trade.serializers.portfoliostocks import PortfolioStockSerializer
from v1.portfolio.models import Portfolio, PortfolioStock
from v1.data.models import StockName


class SellStock(generics.GenericAPIView):
    serializer_class = PortfolioStockSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        stock_id = self.request.data.get('stock')
        quantity = self.request.data.get('quantity')

        try:
            user_portfolio = Portfolio.objects.get(user=self.request.user)
            portfolio_stock = PortfolioStock.objects.get(
                portfolio=user_portfolio, stock_id=stock_id)
        except PortfolioStock.DoesNotExist:
            return Response({'error': 'Portfolio stock does not exist for the given stock'}, status=status.HTTP_400_BAD_REQUEST)

        if portfolio_stock.total_quantity >= quantity:
            self.update_portfolio_stock(portfolio_stock, quantity, stock_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Quantity greater than holding quantity'}, status=status.HTTP_400_BAD_REQUEST)

    def update_portfolio_stock(self, portfolio_stock, quantity, stock_id):
        ltp = StockName.objects.get(id=stock_id).stockdata.ltp

        portfolio_stock.total_quantity -= quantity
        portfolio_stock.total_investment -= quantity * ltp

        if portfolio_stock.total_quantity == 0:
            portfolio_stock.delete()
        else:
            portfolio_stock.avg_cost = (
                portfolio_stock.total_investment / portfolio_stock.total_quantity
            )

            portfolio_stock.total_investment = round(
                portfolio_stock.total_investment, 2)
            portfolio_stock.avg_cost = round(portfolio_stock.avg_cost, 2)

            portfolio_stock.save()
