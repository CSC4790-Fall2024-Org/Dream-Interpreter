import React, { useState } from "react";
import { Text, View, Button, TextInput, ScrollView, Alert, Linking, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { generateVideo } from "../scripts/api-abstraction.js";
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';  
import { supabase } from '../supabase/supabase';



export default function GooeyInterpretation(){

  const router = useRouter();  
  const [dreamInput, setDreamInput] = useState('');
  const [animationLink, setAnimationLink] = useState('');
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false);  

  const getUserData = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.error("Error fetching user:", error);
        return { userId: null, username: null };
      }

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      if (profileError || !data) {
        console.error("Error fetching username from profiles:", profileError);
        return { userId: user.id, username: null };
      }

      return { userId: user.id, username: data.username };
    } catch (err) {
      console.error("Unexpected error fetching user data:", err);
      return { userId: null, username: null };
    }
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
      // Generate the Gooey animation link
      const link = await generateVideo(dreamInput);
      console.log("Generated animation link:", link);  // Log to verify the link

      if (!link) {
        throw new Error("Animation link generation failed");
      }

      setAnimationLink(link);
      setShowWebView(true);
  
      // Get user data
      const { userId, username } = await getUserData();
      if (!userId || !username) {
        Alert.alert("User Error", "Failed to fetch user information.");
        setIsLoading(false);
        return;
      }
  
      // Get the current date and time
      const currentDate = new Date();
      const date = currentDate.toISOString().split("T")[0];
      const time = currentDate.toTimeString().split(" ")[0];
  
      // Insert the dream log into the database
      const { data, error } = await supabase.from("dream").insert([
        {
          username: username,
          input: dreamInput,
          output: link,
          date: date,
          time: time,
          theme: null,
          rating: null,
        },
      ]);
  
      if (error) {
        console.error("Error inserting into Dream table:", error);
        Alert.alert("Database Error", `Failed to save the dream log: ${error.message}`);
      } else {
        console.log("Dream log successfully inserted:", data);
        Alert.alert("Success", "Dream log successfully saved.");
      }
    } catch (error) {
      console.error('Error generating Gooey animation:', error);
      Alert.alert("Error", "Failed to generate animation from Gooey API.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (path: string) => {
    setModalVisible(false); 
    router.push(path);
  };
  

      return (
        <ScrollView style={{ flex: 1, padding: 20 }}>
          {/* Navigate to Pages Button */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.button} 
          >
            <Text style={styles.buttonText}>All Pages</Text>
          </TouchableOpacity>

          <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Choose the page you want!</Text>

                <TouchableOpacity style={styles.pageButton} onPress={() => handleNavigate('./')}>
                   <Text>Home Page</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.pageButton} onPress={() => handleNavigate('./gemini')}>
                   <Text>Textual Dream Interpretation Page</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.pageButton} onPress={() => handleNavigate('./gooey')}>
                    <Text>Visual Dream Interpretation Pag</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.pageButton} onPress={() => handleNavigate('./dream')}>
                    <Text>Dream Log Page</Text>
                </TouchableOpacity>

                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>

          {/* Screen message */}
          <View style={{ padding: 20 }}>
            <Text>Welcome to the Dream Visual Interpretation Screen! Enjoy your Gooey Powered Dream Interpretation!</Text>
          </View>

          {/* Disclaimer */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Checkbox
              value={disclaimerChecked}
              onValueChange={setDisclaimerChecked}
            />
            <Text> I fully acknowledge that this is for entertainment only!</Text>
          </View>
    
          {/* Gooey API Section */}
          <View style={{ marginBottom: 40 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, color:'#C8A2C8'  }}>
            Input your dream details below to get your dream interpreted visually!
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
    
const styles = StyleSheet.create({
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  
  },
  modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
  },
  modalTitle: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
  },
  pageButton: {
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#ddd',
      alignItems: 'center',
      borderRadius: 5,
  },
  interpretationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  normalText: {
    fontSize: 16,
    color: 'black',
  },
  linkText: {
    fontSize: 16,
    color: '#C8A2C8',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  button: {
    alignSelf: 'center', 
    backgroundColor: '#C8A2C8',
    paddingVertical: 8,
    paddingHorizontal: 12, 
    borderRadius: 5,
  },
  button2: {
    alignSelf: 'flex-start', 
    backgroundColor: '#C8A2C8',
    paddingVertical: 8,
    paddingHorizontal: 12, 
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18, 
    color: 'white', 
    fontWeight: 'bold',
  },
  buttonText2: {
    fontSize: 15, 
    color: 'white', 
    fontWeight: 'bold',
  },
});
