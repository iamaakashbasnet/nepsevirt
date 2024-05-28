from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction

from v1.trade.serializers.portfoliostocks import PositionSerializer
from v1.portfolio.models import Portfolio, Position, POSITION_CHOICES
from v1.data.models import StockName
from v1.accounts.models import Fund


class Buy(generics.GenericAPIView):
    serializer_class = PositionSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        stock_id = self.request.data.get('stock')
        quantity = self.request.data.get('quantity')

        user_portfolio = Portfolio.objects.get(user=self.request.user)
        user_fund = Fund.objects.get(user=self.request.user)

        stock_price = StockName.objects.get(id=stock_id).stockdata.ltp
        total_cost = stock_price * quantity

        # Check if fund is available or not
        if user_fund.balance < total_cost:
            return Response({'error': 'Insufficient funds'}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            try:
                position = Position.objects.get(
                    portfolio=user_portfolio, stock_id=stock_id)

                # Buy for long positions
                if position.side != POSITION_CHOICES[1][0]:
                    self.update_long_position(position, quantity, stock_price)
                else:
                    if position.quantity >= quantity:
                        self.update_short_position(
                            position, quantity, stock_price)
                    else:
                        return Response({'error': 'Quantity greater than holding quantity'}, status=status.HTTP_400_BAD_REQUEST)
            except Position.DoesNotExist:
                # Create a new position
                position = Position.objects.create(
                    portfolio=user_portfolio,
                    stock_id=stock_id,
                    side=POSITION_CHOICES[0][0],
                    quantity=quantity,
                    average_fill_price=stock_price
                )
                position.save()

            # Update the user's fund balance
            user_fund.balance -= total_cost
            user_fund.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update_long_position(self, position, quantity, purchase_price):
        total_quantity = position.quantity + quantity
        total_value = position.average_fill_price * \
            position.quantity + purchase_price * quantity
        position.average_fill_price = total_value / total_quantity
        position.quantity = total_quantity
        position.save()

    def update_short_position(self, position, quantity, purchase_price):
        position.quantity -= quantity
        if position.quantity == 0:
            position.delete()
        else:
            position.save()
