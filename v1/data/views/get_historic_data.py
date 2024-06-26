from datetime import date, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response

from v1.data.fetcher.historic_data import NepseData


class FetchHistoricData(APIView):
    def get(self, request, *args, **kwargs):
        test = NepseData(kwargs.get('stockname'), str(date.today() -
                         timedelta(weeks=100)), str(date.today()), 'NRS', '1D')
        return Response(test.dump_data())
