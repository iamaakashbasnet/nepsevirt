from datetime import datetime
import requests
import json


class NepseData:
    def __init__(self, symbol, date_from, date_to, currency,
                 time_frame) -> None:
        self.symbol = symbol
        self.date_from = self.date_to_unix_timestamp(date_from)
        self.date_to = self.date_to_unix_timestamp(date_to)
        self.currency = currency
        self.time_frame = time_frame
        self.url = f'https://www.sharesansar.com/{'nepse-candlestick-chart' if self.symbol == 'NEPSE Index' else 'company-chart'}/history?symbol={
            self.symbol}&resolution={self.time_frame}&from={self.date_from}&to={self.date_to}'

        print(self.symbol)
        print(self.url)

    def date_to_unix_timestamp(self, date_str):
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        return int(date_obj.timestamp())

    def dump_data(self):
        try:
            headers = {
                'User-Agent': 'Mozilla/61.0',
            }

            res = requests.get(self.url, headers=headers)
            if res.status_code == 200:
                ohlc_data = res.json()
                if ohlc_data.get("s") != "ok":
                    print("Error: API response is not 'ok'")
                    return

                # Extract OHLC data
                timestamps = ohlc_data['t']
                close_prices = ohlc_data["c"]

                # Convert timestamps to ISO format and pair with close prices
                formatted_data = [{'time': datetime.utcfromtimestamp(ts).strftime(
                    '%Y-%m-%dT%H:%M:%S'), 'value': close} for ts, close in zip(timestamps, close_prices)]

                return formatted_data
            else:
                print(f'API request failed with status code {res.status_code}')
        except requests.exceptions.RequestException as e:
            print(f'Error making API request: {e}')
        except json.JSONDecodeError as e:
            print(f'Error parsing JSON: {e}')
