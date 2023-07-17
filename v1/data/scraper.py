import json
from urllib.request import urlopen
from bs4 import BeautifulSoup

def get_live_data():
    html = urlopen('https://merolagani.com/LatestMarket.aspx')
    bs = BeautifulSoup(html.read(), 'lxml')
    namelist = bs.find('div', {'id': 'ctl00_ContentPlaceHolder1_LiveTrading'})

    childtag = namelist.find('table')
    childchildtag = childtag.find('tbody')
    gettrtag = childchildtag.find_all('tr')

    data = {}
    for i, elements in enumerate(gettrtag, 1):
        tdtag = elements.find_all('td')
        row_data = [td.text.strip() for td in tdtag if td.text.strip()]
        if row_data:
            data[f"{i}"] = row_data

    # Convert data to formatted JSON
    json_data = json.dumps(data, indent=4)

    # Enclose the JSON data with curly braces as json file
    formatted_json = "{" + "\n" + json_data + "\n" + "}"

    print(json_data)

    # Write JSON data to a file
    with open('data.json', 'w') as file:
        file.write(json_data)

