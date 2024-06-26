from rest_framework import serializers

from v1.portfolio.models import Position
from v1.data.serializers.livedata import LiveDataStockNameSerializer


class PositionSerializer(serializers.ModelSerializer):
    security = LiveDataStockNameSerializer()
    average_fill_price = serializers.DecimalField(
        max_digits=10, decimal_places=2, coerce_to_string=True)
    investment_value = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True)
    current_value = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Position
        fields = '__all__'
