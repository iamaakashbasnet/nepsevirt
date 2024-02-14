from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
    TokenVerifySerializer,
    TokenBlacklistSerializer,
)
from rest_framework_simplejwt.exceptions import InvalidToken


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
