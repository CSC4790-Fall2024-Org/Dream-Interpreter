#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr  4 12:56:41 2024

@author: stevehalley

#web_app.py

#Description: Front-end code for user interface. Used during testing phase of development.

"""
import streamlit as st
from abstraction import AI_test_model

#Initialize top of web application.
st.title("🌙☁️Welcome to the Dream Interpreter ☁️🌙")
user_input=st.text_input("Enter your dream here:")
st.write("Your dream description: \t\t"+ user_input)

#Generate User Dream Interpretation and display on app.
response = AI_test_model.generate_content("Please interpret the following dream: "+ user_input)
st.toast('Your dream was interpreted!', icon='🫡')
st.write(response.text)





