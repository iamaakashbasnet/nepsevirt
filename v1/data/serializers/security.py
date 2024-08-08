from rest_framework import serializers

from v1.data.models import SecurityData, Security


class SecuritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Security
        fields = '__all__'


class SecurityDataSerializer(serializers.ModelSerializer):
    security = SecuritySerializer()
    lastTradedPrice = serializers.DecimalField(
        default=0.00, max_digits=10, decimal_places=2, coerce_to_string=True)
    openPrice = serializers.DecimalField(
        default=0.00, max_digits=10, decimal_places=2, coerce_to_string=True)
    highPrice = serializers.DecimalField(
        default=0.00, max_digits=10, decimal_places=2, coerce_to_string=True)
    lowPrice = serializers.DecimalField(
        default=0.00, max_digits=10, decimal_places=2, coerce_to_string=True)
    previousClose = serializers.DecimalField(
        default=0.00, max_digits=10, decimal_places=2, coerce_to_string=True)

    class Meta:
        model = SecurityData
        fields = '__all__'
