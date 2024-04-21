#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr  4 12:56:41 2024

Name: app.py

@author: Team-12

Description: Front-end code for user interface. 

"""

import streamlit as st
from abstraction import AI_test_model, generate_video

#Page Configuration
st.set_page_config(
    page_title="Home - General Interpretation",
    page_icon="🌙",
    initial_sidebar_state="auto"
)

st.image('/gemini.png')  

#Sidebar Initialization
st.sidebar.success("Select a page above.")

#Initialize top of web application.
st.title("🌙☁️Welcome to the Dream Interpreter ☁️🌙")


user_input=st.text_input("Enter your dream here:")
st.write("Your dream description: \t\t"+ user_input)

#Generate User Dream Interpretation and display on app.
if st.button('Generate Dream Interpretation'):
    response = AI_test_model.generate_content("Please interpret the following dream: "+ user_input)
    st.toast('Your dream was interpreted!', icon='🫡')
    st.write(response.text)
else:
    st.write('Please click button for interpretation')
    
st.download_button(
        label="Download Your Dream Interpretation",
        data= response.text ,
        file_name="dream_interpretation.txt",
        mime="text/plain"
    )






