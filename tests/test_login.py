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

# Test data for parameterization
test_data = [
    (config['Credentials']['valid_username'], config['Credentials']['valid_password'], True, "inventory.html"),
    (config['Credentials']['invalid_username'], config['Credentials']['invalid_password'], False, "Username and password do not match")
]

# Test class
class TestLogin:
    @pytest.mark.parametrize("username,password,should_pass,expected", test_data)
    def test_login(self, driver, username, password, should_pass, expected):
        logger.info(f"Starting test_login with username: {username}, browser: {driver.name}")
        login_page = LoginPage(driver, config)
        login_page.open()
        login_page.enter_credentials(username, password)
        login_page.click_login()
        
        try:
            if should_pass:
                assert expected in driver.current_url, f"Login failed for {username}"
                logger.info(f"Login successful for {username}")
            else:
                error_message = login_page.get_error_message()
                assert expected in error_message, f"Expected error message not found for {username}"
                logger.info(f"Correct error message displayed for {username}")
        except AssertionError as e:
            screenshot = login_page.take_screenshot(f"test_login_{username}")
            logger.error(f"Test failed: {str(e)}. Screenshot saved at {screenshot}")
            raise

if __name__ == "__main__":
    pytest.main(["-v", "--html=reports/report.html", __file__])