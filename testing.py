import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestDreamInterpreterApp(unittest.TestCase):

    def setUp(self):
        """Set up the test driver and navigate to the app."""
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        self.driver.get("http://localhost:8501") 

    def test_interpretation_flow(self):
        driver = self.driver
        wait = WebDriverWait(driver, 10)

        # Input a dream description
        dream_input = wait.until(EC.element_to_be_clickable((By.XPATH, '//input[@placeholder="Enter your dream here:"]')))
        dream_input.send_keys('I dreamed about flying over the ocean.')
        dream_input.send_keys(Keys.RETURN)

        # Check the acknowledgment checkbox
        checkbox = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[type="checkbox"]')))
        checkbox.click()

        # Click the "Generate Dream Interpretation" button
        generate_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//button[text()="Generate Dream Interpretation"]')))
        generate_button.click()

        # Check for the interpretation result
        result = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'div.stMarkdown')))
        self.assertTrue('Your dream was interpreted!' in driver.page_source)

        # Check if the download button is displayed
        download_button = wait.until(EC.visibility_of_element_located((By.XPATH, '//button[@download]')))
        self.assertTrue(download_button.is_displayed())

    def tearDown(self):
        """Tear down the test environment."""
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()