from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from nepse import Nepse
from v1.data.models import Security, SecurityData


nepse = Nepse()
nepse.setTLSVerification(False)


class IsMarketOpen(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(nepse.isNepseOpen())


class LiveMarketData(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        data = nepse.getLiveMarket()

        if not data:
            # TODO: Get data from alternative sources
            return Response({"status": "error", "message": "Market closed"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                with transaction.atomic():
                    for item in data:
                        security_data = item.copy()
                        security_info = {
                            'symbol': item['symbol'],
                            'securityName': item['securityName']
                        }

                        # Get or create the Security instance
                        security, created = Security.objects.get_or_create(
                            symbol=security_info['symbol'],
                            defaults={
                                'securityName': security_info['securityName']}
                        )

                        # If the Security instance exists, update its securityName
                        if not created and security.securityName != security_info['securityName']:
                            security.securityName = security_info['securityName']
                            security.save()

                        security_data['security'] = security.id

                        # Get or create the SecurityData instance
                        security_data_instance, created = SecurityData.objects.update_or_create(
                            security=security,
                            defaults={
                                'lastTradedPrice': security_data['lastTradedPrice'],
                                'openPrice': security_data['openPrice'],
                                'highPrice': security_data['highPrice'],
                                'lowPrice': security_data['lowPrice'],
                                'previousClose': security_data['previousClose']
                            }
                        )

                    return Response({"status": "success"}, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
