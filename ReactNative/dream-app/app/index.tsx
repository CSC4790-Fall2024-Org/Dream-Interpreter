import React, { useState } from "react";
import { useRouter } from 'expo-router';
import { Text, View, Button, ScrollView, Image } from "react-native";
//import { useNavigation } from '@react-navigation/native'; 
// import Checkbox from "expo-checkbox";
// import { textModel, generateVideo } from "../scripts/api-abstraction.js";
// import { WebView } from 'react-native-webview';


export default function Index() {
  const [showUserManual, setShowUserManual] = useState(false); 
  const router = useRouter();

  // const [geminiInput, setGeminiInput] = useState('');
  // const [geminiOutput, setGeminiOutput] = useState('');

  //const [dreamInput, setDreamInput] = useState('');
  //const [animationLink, setAnimationLink] = useState('');

  // const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // const [showWebView, setShowWebView] = useState(false); 

  // const handleGemini = async () => {
  //   if (!disclaimerChecked) {
  //     Alert.alert("Disclaimer", "You need to accept the disclaimer to proceed.");
  //     return;
  //   }

  //   if (geminiInput.trim() === '') {
  //     Alert.alert("Input Required", "Please enter a prompt for Gemini.");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const dreamPrompt = `Please interpret the following dream: ${geminiInput}`;
  //     const content = await textModel(dreamPrompt);
  //     setGeminiOutput(content);
  //   } catch (error) {
  //     console.error('Error generating Gemini content:', error);
  //     Alert.alert("Error", "Failed to generate content from Gemini API.");
  //   }
  //   setIsLoading(false);
  //};

  // const handleGooey = async () => {
  //   if (!disclaimerChecked) {
  //     Alert.alert("Disclaimer", "You need to accept the disclaimer to proceed.");
  //     return;
  //   }

  //   if (dreamInput.trim() === '') {
  //     Alert.alert("Input Required", "Please enter your dream description.");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const link = await generateVideo(dreamInput);
  //     setAnimationLink(link);
  //     setShowWebView(true); 
  //   } catch (error) {
  //     console.error('Error generating Gooey animation:', error);
  //     Alert.alert("Error", "Failed to generate animation from Gooey API.");
  //   }
  //   setIsLoading(false);
  // };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      {/* Screen message */}
      
      <View style={{
        flex: 1,
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
      }}>
      <Image source = {require('../assets/images/gooey-logo.png')} />
      <Image 
          source = {require('../assets/images/gemini-logo.png')}
          style={{width: 128, height: 47}}
        />
      </View>

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
            We are so glad you are here! Here's how to use this application:
          </Text>
          <Text>1. Enter your dream description in the input field.</Text>
          <Text>2. Acknowledge the disclaimer by checking the checkbox.</Text>
          <Text>3. Click on "Generate Dream Interpretation" to proceed.</Text>
          <Text>4. You can view or download the generated interpretation.</Text>
        </View>
      )}

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

      <View style={{ padding: 20 }}>
        <Text>Welcome to the Home Screen!</Text>
        <Button title="Go to Gemini" onPress={() => router.push('./gemini')} />
        <Button title="Go to Gooey" onPress={() => router.push('./gooey')} />
      </View>

      {/* Disclaimer
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Checkbox
          value={disclaimerChecked}
          onValueChange={setDisclaimerChecked}
        />
        <Text>I understand this is AI-generated and for entertainment only.</Text>
      </View> */}

      {/* Gemini API Section
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
      </View> */}

      {/* Gooey API Section
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
      </View> */}
    </ScrollView>
  );
}
