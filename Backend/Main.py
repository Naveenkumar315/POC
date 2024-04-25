from selenium import webdriver
from selenium.webdriver.chrome.service import Service
import pandas as pd


web = 'https://www.bookswagon.com/'

path = 'E:/Python/chromedriver-win64/chromedriver.exe'



service = Service(executable_path=path)
driver = webdriver.Chrome(service=service)
driver.get(web)

products = driver.find_elements(by='xpath', value='//div[contains(@class,"bookbrief")]')

books = []

for product in products:
    title_element = product.find_element(by='xpath', value='.//p[contains(@class, "card-text")]')
    price_element = product.find_element(by='xpath', value='.//span[contains(@class, "actualprice")]')
    author_element = product.find_element(by='xpath', value='.//span[contains(@class, "author")]')
    highrating_elements = product.find_elements(by='xpath', value='.//span[contains(@class, "highrating")]')
    initialprice_elements = product.find_elements(by='xpath', value='.//span[contains(@class, "initialprice")]')
    
    title = title_element.text
    price = price_element.text
    author = author_element.text
    highrating = [elem.text for elem in highrating_elements]
    initialprice = [elem.text for elem in initialprice_elements]

    for rate, init_price in zip(highrating, initialprice):
        if price != '':
            books.append({'Title': title, 'Price': price, 'author': author, 'highrating': rate, 'initialprice': init_price})


my_data = pd.DataFrame(books)
my_data.to_csv('books.csv',index=False)
# print(my_data)