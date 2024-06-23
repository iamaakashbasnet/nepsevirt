from django.contrib.auth import get_user_model
from rest_framework import serializers

from v1.accounts.serializers.user import (
    RequestUserFundSerializer,
    RequestUserProfitLossSerializer
)


class UserRankingSerializer(serializers.ModelSerializer):
    fund = RequestUserFundSerializer(read_only=True)  # Nested serializer
    profitloss = RequestUserProfitLossSerializer(read_only=True)
    ranking = serializers.IntegerField(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('firstname', 'lastname', 'username',
                  'avatar', 'fund', 'profitloss', 'ranking',)
