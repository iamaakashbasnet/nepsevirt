from rest_framework.views import APIView
from rest_framework.response import Response

from v1.data.scraper.livedata import get_live_data


class LiveData(APIView):
    def get(self, request):
        get_live_data()
        return Response({'result': 'fetched'})
