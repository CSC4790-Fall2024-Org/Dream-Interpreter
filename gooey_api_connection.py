#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr  4 13:07:35 2024

@author: stevehalley
"""

import requests

api_key ='sk-duhSgEZDF8nhRmX2THLwCzFog3UKeeUcYJm9YR4Lhw8Hffn9'



def generate_animation_link(dream_input):
    payload = {
        "animation_prompts": [
            {
                "frame": 0,
                "prompt": dream_input,
            }
        ]
    }

    response = requests.post(
        "https://api.gooey.ai/v2/DeforumSD/",
        headers={
            "Authorization": "Bearer " + api_key,
        },
        json=payload,
    )
    assert response.ok, response.content

    result = response.json()
    return result['output_video']

# link = generate_animation_link('i had a bad day')
# print(link)




