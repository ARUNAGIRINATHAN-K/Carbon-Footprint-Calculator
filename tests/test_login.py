import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from configparser import ConfigParser
from pages.login_page import LoginPage
from utilities.logger import setup_logger
import os
