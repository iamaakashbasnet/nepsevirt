from rest_framework import generics, status
from rest_framework.response import Response

from v1.trade.serializers.portfoliostocks import PositionSerializer
from v1.portfolio.models import Portfolio, Position, POSITION_CHOICES
from v1.data.models import StockName


class Sell(generics.GenericAPIView):
    serializer_class = PositionSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        stock_id = self.request.data.get('stock')
        quantity = self.request.data.get('quantity')

        user_portfolio = Portfolio.objects.get(user=self.request.user)
        # Check if the position already exists
        try:
            position = Position.objects.get(
                portfolio=user_portfolio, stock_id=stock_id)

            # Long position sell block
            if position.side != POSITION_CHOICES[1][0]:
                if position.quantity >= quantity:
                    self.update_position(position, quantity)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response({'error': 'Quantity greater than holding quantity'}, status=status.HTTP_400_BAD_REQUEST)
            # Short position block (Adding more short quantity)
            else:
                position.quantity += quantity
                position.average_fill_price = (
                    (position.average_fill_price *
                     position.quantity) / position.quantity
                )
                position.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Position.DoesNotExist:
            # Create a new position
            position = Position.objects.create(
                portfolio=user_portfolio,
                stock_id=stock_id,
                side=POSITION_CHOICES[1][0],
                quantity=quantity,
                average_fill_price=StockName.objects.get(
                    id=self.request.data.get('stock')).stockdata.ltp
            )

            position.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update_position(self, position, quantity):
        position.quantity -= quantity

        if position.quantity == 0:
            position.delete()
        else:
            position.save()
