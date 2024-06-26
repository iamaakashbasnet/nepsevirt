from rest_framework import serializers

from v1.portfolio.models import Position


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ['id', 'security', 'quantity']
