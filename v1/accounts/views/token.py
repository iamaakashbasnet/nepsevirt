from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from v1.accounts.serializers.token import (
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
    CustomTokenVerifySerializer,
)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('access'):
            response.data['at'] = response.data.pop('access')

        if response.data.get('refresh'):
            cookie_max_age = settings.SIMPLE_JWT.get('REFRESH_TOKEN_LIFETIME')
            response.set_cookie(
                'rt', response.data['refresh'], max_age=cookie_max_age, httponly=True, secure=True)
            del response.data['refresh']

        return super().finalize_response(request, response, *args, **kwargs)


class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer
    refresh = None

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('access'):
            response.data['at'] = response.data.pop('access')

        if response.data.get('refresh'):
            cookie_max_age = settings.SIMPLE_JWT.get('REFRESH_TOKEN_LIFETIME')
            response.set_cookie(
                'rt', response.data['refresh'], max_age=cookie_max_age, httponly=True, secure=True)
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)


class CustomTokenVerifyView(TokenVerifyView):
    serializer_class = CustomTokenVerifySerializer
