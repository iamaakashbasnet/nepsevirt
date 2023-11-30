import csv
from django.conf import settings
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt import authentication

from v1.data.scraper.livedata import get_live_data
from v1.data.models import StockName, StockData
from v1.data.serializers import livedata


class FetchLiveData(APIView):
    def get(self, request):
        get_live_data()

        with open(f'{settings.BASE_DIR}/v1/data/csv/livedata.csv', 'r', encoding='UTF-8') as file:
            reader = csv.DictReader(file)

            with transaction.atomic():
                for row in reader:
                    stock_name, created = StockName.objects.get_or_create(
                        name=row['name'])

                    stock_data, _ = StockData.objects.get_or_create(
                        name=stock_name,
                        # Defaults if doesn't exist
                        defaults={
                            'ltp': row['ltp'],
                            'open': row['open'],
                            'high': row['high'],
                            'low': row['low'],
                            'close': row['close'],
                        }
                    )

                    # Update existing entry if necessary
                    if not created:
                        stock_data.ltp = row['ltp']
                        stock_data.open = row['open']
                        stock_data.high = row['high']
                        stock_data.low = row['low']
                        stock_data.close = row['close']
                        stock_data.save()

        return Response({'result': 'fetched'})


class LiveDataListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTAuthentication]
    queryset = StockData.objects.all()
    serializer_class = livedata.LiveDataSerializer


class LiveDataStockNameListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTAuthentication]
    queryset = StockName.objects.all()
    serializer_class = livedata.LiveDataStockNameSerializer
