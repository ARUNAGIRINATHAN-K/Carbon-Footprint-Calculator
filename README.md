#  Automated Testing Framework

## 📌 Project Summary
This is a robust Automated Testing Framework built with Python, Pytest, and Selenium WebDriver for testing web applications. The framework is designed for scalability, maintainability, and ease of use, featuring a Page Object Model (POM), configuration management, cross-browser testing, detailed logging, HTML reporting, and CI/CD integration with GitHub Actions. It currently tests the login functionality of the SauceDemo website but can be extended for other web applications.

## Key Features

- Pytest: Flexible test execution and reporting.
- Selenium WebDriver: Browser automation for UI testing.
- Page Object Model: Modular and maintainable test code.
- Cross-Browser Testing: Supports Chrome and Firefox.
- Parameterized Tests: Efficiently tests multiple scenarios.
- Logging: Detailed logs for debugging (logs/ directory).
- Screenshots: Captures screenshots on test failure (screenshots/ directory).
- HTML Reports: Generates detailed test reports (reports/ directory).
- Configuration: Centralized settings in config.ini.
- CI/CD: GitHub Actions workflow for automated testing.

## 📂 Project Structure
```
automated-testing-framework/
├── config/
│   └── config.ini           # Test configuration
├── pages/
│   └── login_page.py       # Page Object Model
├── tests/
│   └── test_login.py       # Test cases
├── utilities/
│   └── logger.py           # Logging utility
├── reports/                # HTML reports
├── screenshots/            # Failure screenshots
├── logs/                   # Test logs
├── .github/workflows/
│   └── ci.yml              # GitHub Actions workflow
└── requirements.txt        # Dependencies
```


## Install Dependencies:
```
pip install -r requirements.txt
```

## Run Tests:
```
pytest tests/test_login.py -v --html=reports/report.html -n auto
```


## 🧪 Extending the Framework

- Add New Tests: Create new files in tests/ using the same structure.
- Add Pages: Add new page objects in pages/ for other website sections.
- API Testing: Integrate requests for API testing.
- Data-Driven Testing: Use CSV/JSON files for test data.
- Advanced Reporting: Replace pytest-html with Allure for richer reports.
- Docker: Containerize the environment for consistency.
