from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt import authentication

from v1.data.fetcher.live_market_data import get_live_market_data
from v1.data.models import Security, SecurityData
from v1.data.serializers import security
from nepse import Nepse


nepse = Nepse()
nepse.setTLSVerification(False)


class GetLiveMarketDataView(APIView):
    """Gets live market data and store it to DB.
    Mainly used for manual data fetching.
    """

    permission_classes = [permissions.AllowAny]

    def get(self, request):
        get_live_market_data()

        return Response({'result': 'fetched'})


class IsMarketOpenView(APIView):
    """Information related to market status, either open or closed
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(nepse.isNepseOpen())


class SecurityListView(ListAPIView):
    """List all the stored security
    """

    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTAuthentication]
    queryset = Security.objects.all()
    serializer_class = security.SecuritySerializer


class SecurityDataListView(ListAPIView):
    """List all the stored security with its live data, ordered based
    on lastUpdatedTime
    """

    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTAuthentication]
    queryset = SecurityData.objects.all().order_by('-lastUpdatedDateTime')
    serializer_class = security.SecurityDataSerializer


class SecurityDetailView(RetrieveAPIView):
    """Show details of individual security
    """

    serializer_class = security.SecurityDataSerializer
    queryset = SecurityData.objects.all()

    def get_object(self):
        return get_object_or_404(
            self.get_queryset(), id=self.kwargs.get('id'))
