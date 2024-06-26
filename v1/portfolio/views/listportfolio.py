from django.db.models import F, ExpressionWrapper, Case, When, fields
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response

from v1.portfolio.serializers.portfolio import PositionSerializer
from v1.portfolio.models import Portfolio, Position


class ListPortfolioStocks(generics.ListAPIView):
    serializer_class = PositionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Position.objects.filter(
            portfolio=Portfolio.objects.get(user=self.request.user)
        )

        queryset = queryset.annotate(
            investment_value=ExpressionWrapper(
                F('quantity') * F('average_fill_price'),
                output_field=fields.DecimalField()
            ),
            current_value=ExpressionWrapper(
                Case(
                    When(side='LONG', then=F('quantity')
                         * F('stock__securitydata__lastTradedPrice')),
                    When(side='SHORT', then=-F('quantity')
                         * F('stock__securitydata__lastTradedPrice')),
                    default=0,
                    output_field=fields.DecimalField()
                ),
                output_field=fields.DecimalField()
            )
        )

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        response_data = {'positions': serializer.data}

        return Response(response_data)
