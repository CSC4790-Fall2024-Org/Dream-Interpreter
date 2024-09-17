import React, { useState } from "react";
import { Text, View, Button, TextInput, ScrollView, Alert, CheckBox } from "react-native";
import { geminiModel, generateVideo } from "../scripts/api-abstraction.js"; 

export default function Index() {
  const [geminiInput, setGeminiInput] = useState(''); 
  const [geminiOutput, setGeminiOutput] = useState(''); 

  const [dreamInput, setDreamInput] = useState(''); 
  const [animationLink, setAnimationLink] = useState(null); 

  const [disclaimerChecked, setDisclaimerChecked] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 

  const handleGemini = async () => {
    if (!disclaimerChecked) {
      Alert.alert("Disclaimer", "You need to accept the disclaimer to proceed.");
      return;
    }

    if (geminiInput.trim() === '') {
      Alert.alert("Input Required", "Please enter a prompt for Gemini.");
      return;
    }

    setIsLoading(true);
    try {
      const dreamPrompt = `Please interpret the following dream: ${geminiInput}`;
      const content = await geminiModel(dreamPrompt); 
      setGeminiOutput(content);
    } catch (error) {
      console.error('Error generating Gemini content:', error);
      Alert.alert("Error", "Failed to generate content from Gemini API.");
    }
    setIsLoading(false);
  };

  const handleGooey = async () => {
    if (!disclaimerChecked) {
      Alert.alert("Disclaimer", "You need to accept the disclaimer to proceed.");
      return;
    }

    if (dreamInput.trim() === '') {
      Alert.alert("Input Required", "Please enter your dream description.");
      return;
    }

    setIsLoading(true);
    try {
      const link = await generateVideo(dreamInput);
      setAnimationLink(link);
    } catch (error) {
      console.error('Error generating Gooey animation:', error);
      Alert.alert("Error", "Failed to generate animation from Gooey API.");
    }
    setIsLoading(false);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      {/* Screen message */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <Text>Welcome to your Nocturnal Navigator App!</Text>
      </View>

      {/* Disclaimer Checkbox */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <CheckBox
          value={disclaimerChecked}
          onValueChange={setDisclaimerChecked}
        />
        <Text>I understand this is AI-generated and for entertainment only.</Text>
      </View>

      {/* Gooey API Section */}
      <View style={{ marginBottom: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Gooey API - Generate Animation
        </Text>
        <TextInput
          placeholder="Enter your dream input"
          value={dreamInput}
          onChangeText={setDreamInput}
          style={{
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            padding: 8,
          }}
        />
        <Button title={isLoading ? "Generating..." : "Generate Animation"} onPress={handleGooey} disabled={isLoading} />
        {animationLink ? (
          <Text style={{ marginTop: 20 }}>Animation Link: {animationLink}</Text>
        ) : null}
      </View>

      {/* Gemini API Section */}
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Gemini API - Generate Content
        </Text>
        <TextInput
          placeholder="Enter your prompt for Gemini"
          value={geminiInput}
          onChangeText={setGeminiInput}
          style={{
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            padding: 8,
          }}
        />
        <Button title={isLoading ? "Generating..." : "Generate Content"} onPress={handleGemini} disabled={isLoading} />
        {geminiOutput ? (
          <Text style={{ marginTop: 20 }}>Generated Content: {geminiOutput}</Text>
        ) : null}
      </View>
    </ScrollView>
  );
}
