from rest_framework import generics, status
from rest_framework.response import Response
from django.db import transaction

from v1.trade.serializers.portfoliostocks import PositionSerializer
from v1.portfolio.models import Portfolio, Position, POSITION_CHOICES
from v1.data.models import Security
from v1.accounts.models import Fund, ProfitLoss


class Sell(generics.GenericAPIView):
    serializer_class = PositionSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        stock_id = self.request.data.get('security')
        quantity = self.request.data.get('quantity')

        user_portfolio = Portfolio.objects.get(user=self.request.user)
        user_fund = Fund.objects.get(user=self.request.user)
        user_profit_loss = ProfitLoss.objects.get(user=self.request.user)

        stock_price = Security.objects.get(
            id=stock_id).securitydata.lastTradedPrice
        total_value = stock_price * quantity

        with transaction.atomic():
            try:
                position = Position.objects.get(
                    portfolio=user_portfolio, security_id=stock_id)

                # Sell for long positions
                if position.side != POSITION_CHOICES[1][0]:  # If not short
                    if position.quantity >= quantity:
                        profit = (stock_price -
                                  position.average_fill_price) * quantity
                        user_profit_loss.amount += profit
                        user_profit_loss.save()
                        self.update_long_position(position, quantity)
                        user_fund.balance += total_value
                        user_fund.save()
                    else:
                        return Response({'error': 'Quantity greater than holding quantity'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    self.update_short_position(
                        position, quantity, stock_price, user_profit_loss)
                    user_fund.balance += total_value
                    user_fund.save()
            except Position.DoesNotExist:
                # Create a new short position
                position = Position.objects.create(
                    portfolio=user_portfolio,
                    security_id=stock_id,
                    side=POSITION_CHOICES[1][0],  # Short position
                    quantity=quantity,
                    average_fill_price=stock_price
                )
                position.save()

                user_fund.balance += total_value
                user_fund.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update_long_position(self, position, quantity):
        position.quantity -= quantity
        if position.quantity == 0:
            position.delete()
        else:
            position.save()

    def update_short_position(self, position, quantity, purchase_price, user_profit_loss):
        profit = (position.average_fill_price - purchase_price) * quantity
        user_profit_loss.amount += profit
        user_profit_loss.save()

        total_quantity = position.quantity + quantity
        total_value = position.average_fill_price * \
            position.quantity + purchase_price * quantity
        position.average_fill_price = total_value / total_quantity
        position.quantity = total_quantity
        position.save()
