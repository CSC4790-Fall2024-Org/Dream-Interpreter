import React, { useState } from "react";
import { Text, View, Button, TextInput, ScrollView, Alert } from "react-native";
import Checkbox from "expo-checkbox";
import { textModel } from "../scripts/api-abstraction.js";


export default function GeminiInterpretation() {
  const [geminiInput, setGeminiInput] = useState('');
  const [geminiOutput, setGeminiOutput] = useState('');

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
      const content = await textModel(dreamPrompt);
      setGeminiOutput(content);
    } catch (error) {
      console.error('Error generating Gemini content:', error);
      Alert.alert("Error", "Failed to generate content from Gemini API.");
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
        <Text>Welcome to your Dream Interpretation Screen! Enjoy your Gemini Powered Dream Interpretation!</Text>
      </View>

      {/* Disclaimer */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Checkbox
          value={disclaimerChecked}
          onValueChange={setDisclaimerChecked}
        />
        <Text>I understand this is AI-generated and for entertainment only.</Text>
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
