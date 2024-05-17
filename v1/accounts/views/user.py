from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from rest_framework import generics
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from v1.accounts.models import Fund
from v1.accounts.serializers.user import (
    CreateUserSerializer,
    RequestUserSerializer,
    UserProfileSerializer,
    ChangePasswordSerializer,
    RequestUserFundSerializer,
)
from v1.accounts.utils.token import account_activation_token
from v1.accounts.utils.email_verification import send_account_verification_email


class CreateUserView(generics.CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

        user = get_user_model().objects.get(username=response.data.get('username'))
        send_account_verification_email(request, user)

        return response


class ActivateAccountView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(get_user_model(), pk=uid)
        except (TypeError, ValueError, OverflowError):
            return Response({'detail': 'Invalid user ID'}, status=status.HTTP_400_BAD_REQUEST)

        if account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'detail': 'Account activated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid activation link'}, status=status.HTTP_400_BAD_REQUEST)


class RequestUserDetailView(generics.RetrieveAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = RequestUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class RequestUserUpdateView(generics.UpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = RequestUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Check if the email is being updated
        if 'email' in serializer.validated_data:
            if serializer.validated_data['email'] != instance.email:
                # If email is being updated, make the user inactive
                instance.is_verified = False
                instance.save()
                self.perform_update(serializer)
                # Send verification email
                send_account_verification_email(request, self.request.user)

        self.perform_update(serializer)
        return Response(serializer.data)


class PasswordChangeView(APIView):
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']
            confirm_password = serializer.validated_data['confirm_password']
            user = request.user

            if not user.check_password(old_password):
                return Response({"message": "Old password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

            if new_password != confirm_password:
                return Response({"message": "New passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()
            return Response({"message": "Password successfully changed."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestUserFundView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RequestUserFundSerializer

    def get_object(self):
        return Fund.objects.get(user=self.request.user)


class UserProfileView(generics.RetrieveAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        user = get_object_or_404(
            self.get_queryset(), username=self.kwargs.get('username'))

        return user
