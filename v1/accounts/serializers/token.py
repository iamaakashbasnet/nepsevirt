from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
    TokenVerifySerializer,
    TokenBlacklistSerializer,
)
from rest_framework_simplejwt.exceptions import InvalidToken

from v1.accounts.serializers.user import RequestUserFundSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.avatar.url)

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data['firstname'] = user.firstname
        data['lastname'] = user.lastname
        data['username'] = user.username
        data['email'] = user.email
        data['avatar'] = self.get_image_url(user)
        data['is_verified'] = user.is_verified

        fund_serializer = RequestUserFundSerializer(
            user.fund, context=self.context)
        data['fund'] = fund_serializer.data

        return data


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    # This ensures we don't need refresh token in body
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('rt')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise InvalidToken('No valid token found.')


class CustomTokenVerifySerializer(TokenVerifySerializer):
    pass


class CustomTokenBlacklistSerializer(TokenBlacklistSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('rt')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise InvalidToken('No valid token found.')
