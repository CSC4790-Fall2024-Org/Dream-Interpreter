#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Mar 24 13:43:52 2024

@author: stevehalley
"""

apiKey = 'AIzaSyDuyyriBGoGjTwGjLYhMS3B1SG3tTUkqLk'
import pathlib
import textwrap

import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown


def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))


genai.configure(api_key=apiKey)

# for m in genai.list_models():
#   if 'generateContent' in m.supported_generation_methods:
#     print(m.name)
    
    
model = genai.GenerativeModel('gemini-pro')


response = model.generate_content("I had a dream I fell off my bike and failed my test. What is the interpretation of this dream?")



print(response.text)