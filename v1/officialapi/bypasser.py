import requests
import json
import datetime
import pytz
import pywasm
from pathlib import Path

tz_NP = pytz.timezone('Asia/Kathmandu')
payld_id = 0
payld_d = 0


class TokenParser:
    def __init__(self):
        wasm_path = Path(__file__).parent / 'css.wasm'
        self.runtime = pywasm.load(str(wasm_path))

    def parse_token_response(self, token_response):
        n = self.runtime.exec('cdx', [token_response['salt1'], token_response['salt2'],
                              token_response['salt3'], token_response['salt4'], token_response['salt5']])
        l = self.runtime.exec('rdx', [token_response['salt1'], token_response['salt2'],
                              token_response['salt4'], token_response['salt3'], token_response['salt5']])
        o = self.runtime.exec('bdx', [token_response['salt1'], token_response['salt2'],
                              token_response['salt4'], token_response['salt3'], token_response['salt5']])
        p = self.runtime.exec('ndx', [token_response['salt1'], token_response['salt2'],
                              token_response['salt4'], token_response['salt3'], token_response['salt5']])
        q = self.runtime.exec('mdx', [token_response['salt1'], token_response['salt2'],
                              token_response['salt4'], token_response['salt3'], token_response['salt5']])

        a = self.runtime.exec('cdx', [token_response['salt2'], token_response['salt1'],
                              token_response['salt3'], token_response['salt5'], token_response['salt4']])
        b = self.runtime.exec('rdx', [token_response['salt2'], token_response['salt1'],
                              token_response['salt3'], token_response['salt4'], token_response['salt5']])
        c = self.runtime.exec('bdx', [token_response['salt2'], token_response['salt1'],
                              token_response['salt4'], token_response['salt3'], token_response['salt5']])
        d = self.runtime.exec('ndx', [token_response['salt2'], token_response['salt1'],
                              token_response['salt4'], token_response['salt3'], token_response['salt5']])
        e = self.runtime.exec('mdx', [token_response['salt2'], token_response['salt1'],
                              token_response['salt4'], token_response['salt3'], token_response['salt5']])

        access_token = token_response['accessToken']
        refresh_token = token_response['refreshToken']

        parsed_access_token = access_token[0:n] + access_token[n + 1: l] + access_token[l +
                                                                                        1: o] + access_token[o + 1: p] + access_token[p + 1:q] + access_token[q + 1:]
        parsed_refresh_token = refresh_token[0:a] + refresh_token[a + 1: b] + refresh_token[b +
                                                                                            1: c] + refresh_token[c + 1: d] + refresh_token[d + 1: e] + refresh_token[e + 1:]

        return (parsed_access_token, parsed_refresh_token)


class Nepse:
    def __init__(self):
        self.token_parser = TokenParser()
        self.base_url = "https://www.nepalstock.com.np"
        self.token_url = f"{self.base_url}/api/authenticate/prove"
        self.refresh_url = f"{self.base_url}/api/authenticate/refresh-token"
        self.post_payload_id = None
        self.api_end_point_access_token = (False, False)
        self.headers = {
            'Host': self.base_url.replace('https://', ''),
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Referer': f'{self.base_url}',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'TE': 'Trailers',
        }

    def requestAPI(self, url, no=None):
        headers = self.headers
        if not no:
            access_token, request_token = self.getToken()
            headers = {'Authorization': f'Salter {
                access_token}', **self.headers}

        response = requests.get(url, headers=headers, verify=False)
        return (response.text, response.status_code)

    def requestPOSTAPI(self, url, post_data=None):
        access_token, request_token = self.getToken()
        headers = {'Content-Type': 'application/json',
                   'Authorization': f'Salter {access_token}', **self.headers}
        if post_data:
            response = requests.post(
                url, headers=headers, data=json.dumps(post_data), verify=False)
        else:
            response = requests.post(url, headers=headers, data=json.dumps(
                {"id": self.getPOSTPayloadID()}), verify=False)
        return (response.text, response.status_code)

    def getToken(self):
        if self.api_end_point_access_token == (False, False):
            token_response = self.getValidToken()
            self.api_end_point_access_token = token_response
        return self.api_end_point_access_token

    def refreshToken(self):
        access_token, refresh_token = self.api_end_point_access_token
        if access_token != False:
            data = json.dumps({'refreshToken': refresh_token})
            headers = {**self.headers,
                       "Content-Type": "application/json",
                       "Content-Length": str(len(data)),
                       "Authorization": f"Salter {access_token}"}
            refresh_key = requests.post(
                self.refresh_url, headers=headers, data=data, verify=False)
            if refresh_key.status_code != 200:
                self.resetToken()
            else:
                self.api_end_point_access_token = self.getValidTokenFromJSON(
                    refresh_key.json())
        else:
            self.getToken()

    def resetToken(self):
        self.api_end_point_access_token = (False, False)

    def getValidTokenFromJSON(self, token_response):
        self.salts = []
        for salt_index in range(1, 6):
            val = int(token_response[f'salt{salt_index}'])
            token_response[f'salt{salt_index}'] = val
            self.salts.append(val)
        return self.token_parser.parse_token_response(token_response)

    def getValidToken(self):
        token_response = json.loads(
            self.requestAPI(url=self.token_url, no='no')[0])
        return self.getValidTokenFromJSON(token_response)

    def getDummyID(self):
        global payld_d, payld_id
        now = datetime.datetime.now(tz_NP)
        if payld_d == now.day:
            return payld_id
        payld_d = now.day
        payld_id = json.loads(self.requestAPI(
            url='https://www.nepalstock.com.np/api/nots/nepse-data/market-open')[0])['id']
        return payld_id

    def getDummyData(self):
        return [147, 117, 239, 143, 157, 312, 161, 612, 512, 804,
                411, 527, 170, 511, 421, 667, 764, 621, 301, 106, 133, 793,
                411, 511, 312, 423, 344, 346, 653, 758, 342, 222, 236, 811,
                711, 611, 122, 447, 128, 199, 183, 135, 489, 703, 800, 745,
                152, 863, 134, 211, 142, 564, 375, 793, 212, 153, 138, 153,
                648, 611, 151, 649, 318, 143, 117, 756, 119, 141, 717, 113,
                112, 146, 162, 660, 693, 261, 362, 354, 251, 641, 157, 178,
                631, 192, 734, 445, 192, 883, 187, 122, 591, 731, 852, 384,
                565, 596, 451, 772, 624, 691]

    def getPOSTPayloadIDForNepseIndex(self):
        dummy_id = self.getDummyID()
        now = datetime.datetime.now(tz_NP)
        e = self.getDummyData()[dummy_id] + dummy_id + 2*(now.day)
        n = e + self.salts[3 if e % 10 < 5 else 1] * \
            now.day - self.salts[(3 if e % 10 < 5 else 1) - 1]
        self.post_payload_id = n
        return self.post_payload_id

    def getPOSTPayloadIDForFloorSheet(self):
        dummy_id = self.getDummyID()
        now = datetime.datetime.now(tz_NP)
        e = self.getDummyData()[dummy_id] + dummy_id + 2*(now.day)
        n = e + self.salts[1 if e % 10 < 4 else 3] * \
            now.day - self.salts[(1 if e % 10 < 4 else 3) - 1]
        self.post_payload_id = n
        return self.post_payload_id

    def getPOSTPayloadID(self):
        dummy_id = self.getDummyID()
        now = datetime.datetime.now(tz_NP)
        self.post_payload_id = self.getDummyData(
        )[dummy_id] + dummy_id + 2*(now.day)
        return self.post_payload_id

    def get_data(self, path, post_data=None):
        url = f'https://nepalstock.com.np/api/nots{path}'
        if post_data:
            return self.requestPOSTAPI(url, post_data)
        else:
            return self.requestAPI(url)
