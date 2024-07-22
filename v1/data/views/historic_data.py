from datetime import date, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response

from v1.data.fetcher.ohlc_data import OHLCData


class OHLCDataView(APIView):
    def get(self, request, *args, **kwargs):
        test = OHLCData(kwargs.get('security'), str(date.today() -
                                                    timedelta(weeks=100)), str(date.today()), 'NRS', '1D')
        return Response(test.dump_data())
