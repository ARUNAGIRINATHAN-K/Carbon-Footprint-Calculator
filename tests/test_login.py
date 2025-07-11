import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from configparser import ConfigParser
from pages.login_page import LoginPage
from utilities.logger import setup_logger
import os

# Load configuration
config = ConfigParser()
config.read("config/config.ini")

# Setup logger
logger = setup_logger()

# Fixture for browser setup
@pytest.fixture(params=[("chrome", config['DEFAULT']['headless'] == 'true'), ("firefox", config['DEFAULT']['headless'] == 'true')])
def driver(request):
    browser, headless = request.param
    if browser == "chrome":
        options = Options()
        if headless:
            options.add_argument("--headless")
        driver = webdriver.Chrome(options=options)
    else:
        options = FirefoxOptions()
        if headless:
            options.add_argument("--headless")
        driver = webdriver.Firefox(options=options)
    yield driver
    driver.quit()
