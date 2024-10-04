import React, { useState } from "react";
import { Text, View, Button, TextInput, ScrollView, Alert, Linking } from "react-native";
import Checkbox from "expo-checkbox";
import { generateVideo } from "../scripts/api-abstraction.js";
import { WebView } from 'react-native-webview';

export default function GooeyInterpretation(){

    const [dreamInput, setDreamInput] = useState('');
    const [animationLink, setAnimationLink] = useState('');

    const [disclaimerChecked, setDisclaimerChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [showWebView, setShowWebView] = useState(false); 


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
          setShowWebView(true); 
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
    
          {/* Disclaimer */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Checkbox
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
              <Text style={{ marginTop: 20 }}>
                Animation Link:
                <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(animationLink)}>
                  Click here to view
                </Text>
              </Text>
            ) : null}
          </View>
        </ScrollView>
      );
}
    
