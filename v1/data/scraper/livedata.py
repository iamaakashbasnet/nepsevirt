import json
import csv
from django.conf import settings
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def get_live_data():
    url = 'https://merolagani.com/LatestMarket.aspx'
    # Set up Chrome options to run in headless mode
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)

    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.ID, 'ctl00_ContentPlaceHolder1_LiveTrading'))
        )

        bs = BeautifulSoup(driver.page_source, 'lxml')
        namelist = bs.find(
            'div', {'id': 'ctl00_ContentPlaceHolder1_LiveTrading'})

        childtag = namelist.find('table')
        childchildtag = childtag.find('tbody')
        gettrtag = childchildtag.find_all('tr')

        data = []
        for elements in gettrtag:
            tdtag = elements.find_all('td')
            new_value = tdtag[1].text.strip().replace(',', '')
            percentage_change = tdtag[2].text.strip()

            row_data = {
                'name': tdtag[0].text.strip(),
                'ltp': tdtag[1].text.strip().replace(',', ''),
                'open': tdtag[5].text.strip().replace(',', ''),
                'high': tdtag[3].text.strip().replace(',', ''),
                'low': tdtag[4].text.strip().replace(',', ''),
                'close': round(float(new_value)/(1 + float(percentage_change)/100), 2),
                'quantity': tdtag[6].text.strip().replace(',', '')
            }
            data.append(row_data)

        json_data = json.dumps(data, indent=4)

        # Write JSON data to a file
        with open(f'{settings.BASE_DIR}/v1/data/json/livedata.json', 'w', encoding='UTF-8') as file:
            file.write(json_data)

        header = data[0].keys()
        # Write JSON data to csv
        with open(f'{settings.BASE_DIR}/v1/data/csv/livedata.csv', 'w', encoding='UTF-8') as file:
            writer = csv.DictWriter(file, fieldnames=header)
            writer.writeheader()
            writer.writerows(data)
    finally:
        driver.quit()
