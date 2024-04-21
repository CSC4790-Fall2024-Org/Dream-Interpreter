import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
#from webdriver_manager.chrome import ChromeDriverManager

class TestDreamInterpreter(unittest.TestCase):

    def setUp(self):
        """ Setup the test driver and create test variables """
        #self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        self.driver.get("http://localhost:8501")  # Make sure your Streamlit app is running on this port

    def test_dream_interpreter(self):
        """ Test entering a dream and generating an interpretation """
        driver = self.driver
        dream_input = driver.find_element(By.XPATH, '//input[@placeholder="Enter your dream here:"]')
        dream_input.send_keys('I was flying over mountains with dragons.')
        dream_input.send_keys(Keys.RETURN)

        # Click the generate button
        generate_button = driver.find_element(By.XPATH, '//button[text()="Generate Dream Interpretation"]')
        generate_button.click()

        # Wait for response to ensure the interpretation is generated
        time.sleep(5)  # Adjust the sleep time based on the response time of your app

        # Check for download button presence
        download_button = driver.find_element(By.XPATH, '//button[@download]')
        self.assertTrue(download_button.is_displayed())

    def tearDown(self):
        """ Tear down the test environment """
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
