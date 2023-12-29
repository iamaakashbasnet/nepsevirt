from decimal import Decimal
from django.db.models import F, ExpressionWrapper, fields
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response

from v1.portfolio.serializers.portfolio import PositionSerializer
from v1.portfolio.models import Portfolio, Position
from v1.data.models import StockData, StockName


class ListPortfolioStocks(generics.ListAPIView):
    serializer_class = PositionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Position.objects.filter(
            portfolio=Portfolio.objects.get(user=self.request.user))

        queryset = queryset.annotate(
            investment_value=ExpressionWrapper(
                F('quantity') * F('average_fill_price'),
                output_field=fields.DecimalField()
            ),
            current_value=ExpressionWrapper(
                F('quantity') * F('stock__stockdata__ltp'),
                output_field=fields.DecimalField()
            )
        )

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        total_investment_value = sum(
            item.investment_value for item in queryset)
        total_current_value = sum(item.current_value for item in queryset)
        serializer = self.get_serializer(queryset, many=True)

        response_data = {'total_investment_value': total_investment_value,
                         'total_current_value': total_current_value,
                         'positions': serializer.data}

        return Response(response_data)
