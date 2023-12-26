from rest_framework import serializers

from v1.portfolio.models import Position
from v1.data.serializers.livedata import LiveDataSerializer


class PositionSerializer(serializers.ModelSerializer):
    stock = LiveDataSerializer()
    average_fill_price = serializers.DecimalField(
        default=0.00, max_digits=10, decimal_places=2, coerce_to_string=True)

    class Meta:
        model = Position
        fields = '__all__'
