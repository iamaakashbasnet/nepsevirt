from rest_framework import serializers

from v1.data.models import StockData, StockName


class LiveDataStockNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockName
        fields = '__all__'


class LiveDataSerializer(serializers.ModelSerializer):
    name = serializers.StringRelatedField()
    ltp = serializers.DecimalField(
        default=0.00, max_digits=10, decimal_places=2, coerce_to_string=True)
    open = serializers.DecimalField(
        default=0.00, max_digits=10, decimal_places=2, coerce_to_string=True)
    high = serializers.DecimalField(
        default=0.00, max_digits=10, decimal_places=2, coerce_to_string=True)
    low = serializers.DecimalField(
        default=0.00, max_digits=10, decimal_places=2, coerce_to_string=True)
    close = serializers.DecimalField(
        default=0.00, max_digits=10, decimal_places=2, coerce_to_string=True)

    class Meta:
        model = StockData
        fields = '__all__'
