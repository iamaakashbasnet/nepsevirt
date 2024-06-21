import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from nepse import Nepse


# TODO: Token expiry issue
# from v1.officialapi.bypasser import Nepse


nepse = Nepse()
nepse.setTLSVerification(False)


# TODO: Token expiry issue
# class IsMarketOpen(APIView):
#     def get(self, request, *args, **kwargs):
#         path = '/nepse-data/market-open'
#         post_data = request.POST if request.method == 'POST' else None
#         data, status_code = nepse.get_data(path, post_data)

#         return Response(json.loads(data), status=status_code)


class IsMarketOpen(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(nepse.isNepseOpen())
