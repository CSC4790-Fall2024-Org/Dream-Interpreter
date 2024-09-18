import React, { useState } from "react";
import { Text, View, Button, TextInput, ScrollView, Alert } from "react-native";
import Checkbox from 'expo-checkbox';

import { geminiModel, generateVideo } from "../scripts/api-abstraction.js";

export default function Index() {
  const [geminiInput, setGeminiInput] = useState('');
  const [geminiOutput, setGeminiOutput] = useState('');

  const [dreamInput, setDreamInput] = useState('');
  const [animationLink, setAnimationLink] = useState(null);

  const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showUserManual, setShowUserManual] = useState(false); 

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
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
      }}>
        <Text>Welcome to your Nocturnal Navigator App!</Text>
      </View>

      {/* Toggle User Manual */}
      <Button
        title={showUserManual ? "Hide User Manual" : "Show User Manual"}
        onPress={() => setShowUserManual(!showUserManual)}
      />

      {/* User Manual Section */}
      {showUserManual && (
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>User Manual</Text>
          <Text>
            Welcome to the Dream Interpreter! Here's how to use this application:
          </Text>
          <Text>1. Enter your dream description in the input field.</Text>
          <Text>2. Acknowledge the disclaimer by checking the checkbox.</Text>
          <Text>3. Click on "Generate Dream Interpretation" to proceed.</Text>
          <Text>4. You can view or download the generated interpretation.</Text>
        </View>
      )}

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

      {/* Disclaimer about Technology Used */}
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Powered by:</Text>
        <Text>This application uses Gooey AI and Gemini AI technologies for dream interpretations.</Text>
      </View>

      {/* AI Disclaimer */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Disclaimer:</Text>
        <Text>This interpretation is generated by AI and should be used for entertainment purposes only.</Text>
      </View>

      {/* Disclaimer */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <CheckBox
          value={disclaimerChecked}
          onValueChange={setDisclaimerChecked}
        />
        <Text>I understand this is AI-generated and for entertainment only.</Text>
      </View>


    </ScrollView>
  );
}
