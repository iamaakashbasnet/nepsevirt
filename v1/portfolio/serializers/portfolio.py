from rest_framework import serializers

from v1.portfolio.models import PortfolioStock
from v1.data.serializers.livedata import LiveDataSerializer


class PortfolioStockSerializer(serializers.ModelSerializer):
    stock = LiveDataSerializer()
    avg_cost = serializers.DecimalField(
        default=0.00, max_digits=10, decimal_places=2, coerce_to_string=True)

    class Meta:
        model = PortfolioStock
        fields = '__all__'
