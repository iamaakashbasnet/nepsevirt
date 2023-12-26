from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response

from v1.portfolio.serializers.portfolio import PositionSerializer
from v1.portfolio.models import Portfolio, Position
from v1.data.models import StockData


class ListPortfolioStocks(generics.ListAPIView):
    serializer_class = PositionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Position.objects.filter(
            portfolio=Portfolio.objects.get(user=self.request.user))

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        res = super().list(request=request).data

        return Response(res)
