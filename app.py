#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr  4 12:56:41 2024

@author: stevehalley

#web_app.py

#Description: Front-end code for user interface. Used during testing phase of development.

"""
import streamlit as st
from abstraction import AI_test_model, generate_video

#Initialize top of web application.
st.title("🌙☁️Welcome to the Dream Interpreter ☁️🌙")

categories = ("General","Positive","Negative","Nightmare","Success","Failure")
selected_category = st.selectbox("Select the theme for your dream interpreation:",categories,index=None,placeholder='Seleect theme...')

user_input=st.text_input("Enter your dream here:")s
st.write("Your dream description: \t\t"+ user_input)

#Generate User Dream Interpretation and display on app.
if st.button('Generate Dream Interpretation'):
    response = AI_test_model.generate_content("Please interpret the following dream: "+ user_input)
    st.toast('Your dream was interpreted!', icon='🫡')
    st.write(response.text)
else:
    st.write('Please click button for interpretation')

    


st.title('Dream Animation Generator')

#WARNING: Do not run the generate animation function since we only get 30 tries for free.
user_animation_input=st.text_input("Enter a scene from your dream:")
if st.button('Generate Dream Animation'):
    # st.write('Animation Link:' + generate_video(user_animation_input))
    pass
else:
    st.write('Dream animation pending')







