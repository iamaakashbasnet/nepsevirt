from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
    TokenVerifySerializer,
)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    pass


class CustomTokenVerifySerializer(TokenVerifySerializer):
    pass
