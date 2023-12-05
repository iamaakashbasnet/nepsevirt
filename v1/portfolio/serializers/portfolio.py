from rest_framework import serializers

from v1.portfolio.models import PortfolioStock
from v1.data.serializers.livedata import LiveDataSerializer


class PortfolioStockSerializer(serializers.ModelSerializer):
    stock = LiveDataSerializer()

    class Meta:
        model = PortfolioStock
        fields = '__all__'
