from django.urls import path

from .views.token import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    CustomTokenBlacklistView,
)
from .views.user import (
    CurrentUserDetailView,
    CreateUserView,
    UserProfileView,
    CurrentUserUpdateView,
    ActivateAccountView,
    CurrentUserPasswordChangeView
)


urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token-obtain'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token-refresh'),
    path('token/verify/', CustomTokenVerifyView.as_view(), name='token-verify'),
    path('token/blacklist/', CustomTokenBlacklistView.as_view(),
         name='token-blacklist'),
    path('signup/', CreateUserView.as_view(), name='signup'),
    path('activate/<uidb64>/<token>/',
         ActivateAccountView.as_view(), name='activate-user'),
    path('user/me/', CurrentUserDetailView.as_view(), name='user-me'),
    path('user/me/update/', CurrentUserUpdateView.as_view(), name='user-update'),
    path('password-change/', CurrentUserPasswordChangeView.as_view(),
         name='user-password-change'),
    path('profile/<str:username>/', UserProfileView.as_view(), name='user-profile'),
]
