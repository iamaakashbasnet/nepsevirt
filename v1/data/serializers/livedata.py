from rest_framework import serializers
from v1.data.models import StockData, StockName


class LiveDataStockNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockName
        fields = '__all__'


class LiveDataSerializer(serializers.ModelSerializer):
    name = serializers.StringRelatedField()

    class Meta:
        model = StockData
        fields = '__all__'
