from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework import permissions

from v1.accounts.serializers import user


class CreateUserView(generics.CreateAPIView):
    serializer_class = user.CreateUserSerializer
    permission_classes = [permissions.AllowAny]


class CurrentUserDetailView(generics.RetrieveAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = user.CurrentUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class CurrentUserUpdateView(generics.UpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = user.CurrentUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserProfileView(generics.RetrieveAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = user.UserProfileSerializer

    def get_object(self):
        user = get_object_or_404(
            self.get_queryset(), username=self.kwargs.get('username'))

        return user
