from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
from datetime import datetime

class LoginPage:
    def __init__(self, driver, config):
        self.driver = driver
        self.config = config
        self.url = config['DEFAULT']['base_url']
        self.username_field = (By.ID, "user-name")
        self.password_field = (By.ID, "password")
        self.login_button = (By.ID, "login-button")
        self.error_message = (By.CSS_SELECTOR, "h3[data-test='error']")

    def open(self):
        self.driver.get(self.url)

    def enter_credentials(self, username, password):
        WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located(self.username_field)).send_keys(username)
        self.driver.find_element(*self.password_field).send_keys(password)

    def click_login(self):
        self.driver.find_element(*self.login_button).click()

    def get_error_message(self):
        return WebDriverWait(self.driver, 10).until(EC.visibility_of_element_located(self.error_message)).text
