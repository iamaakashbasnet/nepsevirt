import time
from django.db import transaction
from nepse import Nepse
from v1.data.models import Security, SecurityData


nepse = Nepse()
nepse.setTLSVerification(False)


def get_live_market():
    data = nepse.getLiveMarket()
    try:
        with transaction.atomic():
            for item in data:
                security_data = item.copy()
                security_info = {
                    'symbol': item['symbol'],
                    'securityName': item['securityName']
                }

                security, created = Security.objects.get_or_create(
                    symbol=security_info['symbol'],
                    defaults={'securityName': security_info['securityName']}
                )

                # If the Security instance exists, update its securityName
                if not created and security.securityName != security_info['securityName']:
                    security.securityName = security_info['securityName']
                    security.save()

                security_data['security'] = security.id

                # Get or create the SecurityData instance
                SecurityData.objects.update_or_create(
                    security=security,
                    defaults={
                        'lastTradedPrice': security_data['lastTradedPrice'],
                        'openPrice': security_data['openPrice'],
                        'highPrice': security_data['highPrice'],
                        'lowPrice': security_data['lowPrice'],
                        'previousClose': security_data['previousClose'],
                        'lastUpdatedDateTime': security_data['lastUpdatedDateTime']
                    }
                )
    except Exception as e:
        raise Exception(
            f"An error occurred while processing live market data: {e}")


def run_every_15_seconds():
    for _ in range(4):  # This will run the function 4 times (every 15 seconds) within one minute
        get_live_market()
        time.sleep(15)  # Wait for 15 seconds
