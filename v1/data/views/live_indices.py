from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from nepse import Nepse


nepse = Nepse()
nepse.setTLSVerification(False)


class MainIndicesView(APIView):
    """Gets indices information
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(nepse.getNepseIndex())


class SubIndicesView(APIView):
    """Gets sub indices information
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(nepse.getNepseSubIndices())
