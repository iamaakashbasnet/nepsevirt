from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework import permissions
from v1.accounts.serializers import user


class CurrentUserDetailView(generics.RetrieveAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = user.CurrentUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
