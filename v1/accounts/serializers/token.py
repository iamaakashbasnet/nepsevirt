from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
    TokenVerifySerializer,
)
from rest_framework_simplejwt.exceptions import InvalidToken


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Confused if to send user data in token itself or separately
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)
    #     token['name'] = user.username
    #     return token

    # For now sending data separately
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data['firstname'] = user.first_name
        data['lastname'] = user.last_name
        data['username'] = user.username
        data['email'] = user.email

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
