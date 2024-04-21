#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr  4 12:58:29 2024

Name: gemini_api_connection.py

@author: Team-12

Description: Establish a connection to Gemini and use it to send/receive user input and interpretation output.


"""

import google.generativeai as genai

apiKey = 'AIzaSyDuyyriBGoGjTwGjLYhMS3B1SG3tTUkqLk'
genai.configure(api_key=apiKey)


gemini_model = genai.GenerativeModel('gemini-pro')

# while True:
    
#     user_input = input("Describe your dream in detail or enter 'exit'").strip()
    
#     if user_input.lower() == 'exit':
#         print("Exiting...")
#         break
    
#     if user_input == '':
#         print("Try again...")
#         continue
    
#     ai_Interpretation = gemini_model.generate(user_input)
    
<<<<<<< HEAD
    if user_input == '': # If no input by user 
        print("Try again...")
        continue
    
    ai_Interpretation = gemini_model.generate(user_input) #Need to find a way to add prompts into this
    print("Here's what the AI thinks: ", ai_Interpretation)
=======
    
>>>>>>> 120f4207696c34415828489f5147e339cc33e281
    
    user_feedback = input("Was this helpful? yes or no:")
    if user_feedback.lower() == 'yes':
        log_positive_feedback #to make gemini learn from previous interpretations
    if user_feedback.lower() == 'no':
        log_negative_feedback # 
    


