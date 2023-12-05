from rest_framework import serializers

from v1.portfolio.models import PortfolioStock


class PortfolioStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioStock
        fields = ['id', 'stock', 'quantity', 'avg_price']
