import React, { useState } from 'react';
import { View, Button, TextInput, Text } from 'react-native';

const GooeyAPIConnection = () => {
  const [dreamInput, setDreamInput] = useState('');
  const [animationLink, setAnimationLink] = useState(null);
  const apiKey = 'sk-YphiJP1mvUur1A1gQdCXB9zQNoI46UpnGB5VtbnxNA1kagZD';

  const generateAnimationLink = async () => {
    const payload = {
      animation_prompts: [
        {
          frame: 0,
          prompt: dreamInput,
        },
      ],
    };

    try {
      const response = await fetch('https://api.gooey.ai/v2/DeforumSD/', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const result = await response.json();
      setAnimationLink(result.output.output_video);
    } catch (error) {
      console.error('Error fetching animation link:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter your dream input"
        value={dreamInput}
        onChangeText={setDreamInput}
      />
      <Button title="Generate Animation" onPress={generateAnimationLink} />
      {animationLink && (
        <Text>Animation Link: {animationLink}</Text>
      )}
    </View>
  );
};

export default GooeyAPIConnection;
