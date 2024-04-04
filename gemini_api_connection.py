#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr  4 12:58:29 2024

Description: Establish a connection to Gemini and use it to send/receive user input and interpretation output.

@author: stevehalley
"""

import google.generativeai as genai

apiKey = 'AIzaSyDuyyriBGoGjTwGjLYhMS3B1SG3tTUkqLk'
genai.configure(api_key=apiKey)


gemini_model = genai.GenerativeModel('gemini-pro')
        


