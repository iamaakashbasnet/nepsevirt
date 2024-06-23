from django.contrib.auth import get_user_model
from django.db.models import Sum
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView
)
from rest_framework import permissions

from v1.accounts.serializers.ranking import (
    UserRankingSerializer
)


class UserRankingView(ListAPIView):
    serializer_class = UserRankingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        User = get_user_model()
        # Annotate and order the users by their total profit/loss
        queryset = User.objects.annotate(total_profitloss=Sum(
            'profitloss__amount')).order_by('-total_profitloss')

        # Add the ranking to each user
        for index, user in enumerate(queryset):
            user.ranking = index + 1  # Rank is 1-based
        return queryset


class RequestUserRankingView(RetrieveAPIView):
    serializer_class = UserRankingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        User = get_user_model()
        current_user = self.request.user

        # Determine the ranking based on profitloss (or any other criterion)
        all_users = User.objects.annotate(total_profitloss=Sum(
            'profitloss__amount')).order_by('-total_profitloss')

        # Find the ranking of the current user
        for index, user in enumerate(all_users):
            if user.id == current_user.id:
                current_user.ranking = index + 1  # Rank is 1-based
                break

        return current_user
