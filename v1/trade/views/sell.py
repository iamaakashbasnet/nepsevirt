from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

from v1.trade.serializers.portfoliostocks import PortfolioStockSerializer
from v1.portfolio.models import Portfolio, PortfolioStock
from v1.data.models import StockName


class SellStock(generics.CreateAPIView):
    serializer_class = PortfolioStockSerializer

    def perform_create(self, serializer):
        user_portfolio = Portfolio.objects.get(user=self.request.user)
        stock_id = self.request.data.get('stock')
        quantity_to_sell = self.request.data.get('quantity')
        selling_price = StockName.objects.get(id=stock_id).stockdata.ltp

        try:
            portfolio_stocks = PortfolioStock.objects.filter(
                portfolio=user_portfolio, stock__id=stock_id)

            # Calculate the total quantity of the specified stock in the user's portfolio
            total_quantity = sum(stock.quantity for stock in portfolio_stocks)

            if total_quantity < quantity_to_sell:
                return Response({'error': 'Not enough stocks to sell.'}, status=status.HTTP_400_BAD_REQUEST)

            for portfolio_stock in portfolio_stocks:
                if quantity_to_sell <= 0:
                    break

                if portfolio_stock.quantity >= quantity_to_sell:
                    # Deduct from the current portfolio stock entry
                    portfolio_stock.quantity -= quantity_to_sell
                    portfolio_stock.save()
                    quantity_to_sell = 0
                else:
                    # Deduct from the current portfolio stock entry and continue to the next
                    quantity_to_sell -= portfolio_stock.quantity
                    portfolio_stock.quantity = 0
                    portfolio_stock.save()

        except PortfolioStock.DoesNotExist:
            return Response({'error': 'Stock not found in the portfolio.'}, status=status.HTTP_400_BAD_REQUEST)

        # New entry for the sold stocks
        serializer.validated_data['portfolio'] = user_portfolio
        serializer.validated_data['stock'] = StockName.objects.get(id=stock_id)
        serializer.validated_data['quantity'] = self.request.data.get(
            'quantity')
        serializer.validated_data['purchase_price'] = selling_price
        serializer.save()
