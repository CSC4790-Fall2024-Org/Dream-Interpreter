// import React, { useState } from 'react';
// import { View, Button, TextInput, Text } from 'react-native';

const apiKey = 'sk-Yags7fDplAFlaVKBFqwzmDtS1oRiqdfoseoDMkCK3vChFAfM';

export function generateAnimationLink(dreamInput) {
  const payload = {
    animation_prompts: [
      {
        frame: 0,
        prompt: dreamInput,
      },
    ],
  };
  async function gooeyAPI(){
    try {
      const response = await fetch('https://api.gooey.ai/v2/DeforumSD/', {
        method: 'POST',
        headers: {
          'Authorization': `bearer sk-Yags7fDplAFlaVKBFqwzmDtS1oRiqdfoseoDMkCK3vChFAfM`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(response.status);
      }

      const result = await response.json();
      return result.output.output_video;
    } catch (error) {
      console.error('Error fetching animation link:', error);
    }
  }
  return gooeyAPI();
};

// return (
//   <View>
//     <TextInput
//       placeholder="Enter your dream input"
//       value={dreamInput}
//       onChangeText={setDreamInput}
//     />
//     <Button title="Generate Animation" onPress={generateAnimationLink} />
//     {animationLink && (
//       <Text>Animation Link: {animationLink}</Text>
//     )}
//   </View>
// );
