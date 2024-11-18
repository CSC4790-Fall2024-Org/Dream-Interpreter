import React, { useState } from "react";
import { Text, View, Button, TextInput, ScrollView, Alert, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { textModel } from "../scripts/api-abstraction.js";
import { useRouter } from 'expo-router';
import { supabase } from '../supabase/supabase';

export default function GeminiInterpretation() {
  const [geminiInput, setGeminiInput] = useState('');
  const [geminiOutput, setGeminiOutput] = useState('');
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  // Function to get user ID and username
  const getUserData = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.error("Error fetching user:", error);
        return { userId: null, username: null };
      }

      const { data, error: profileError } = await supabase
        .from('profiles') // Replace with your table name
        .select('username') // Replace 'username' with the actual column name for the username
        .eq('id', user.id) // Replace 'user_id' with the correct foreign key column
        .single();

      if (profileError) {
        console.error("Error fetching username:", profileError);
        return { userId: user.id, username: null };
      }

      return { userId: user.id, username: data.username };
    } catch (err) {
      console.error("Unexpected error fetching user data:", err);
      return { userId: null, username: null };
    }
  };

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

      // Get user data
      const { userId, username } = await getUserData();
      if (!userId) {
        Alert.alert("User Error", "Failed to fetch user information.");
        setIsLoading(false);
        return;
      }

    // Get the current date and time separately
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString(); // e.g., "MM/DD/YYYY"
    const time = currentDate.toLocaleTimeString(); // e.g., "HH:MM:SS AM/PM"

      // Insert the dream log into the database
      if (content) {
        const { data, error } = await supabase
          .from('Dream')
          .insert([
            {
              username: username || 'Unknown', // Fallback if username is null
              input: geminiInput,
              output: content,
              date: date,
              time: time
            }
          ]);

          if (error) {
            // Log detailed error information
            console.error('Error inserting into database:', error);
            Alert.alert("Database Error", `Failed to save data: ${error.message}`);
            console.log('Detailed Error Info:', {
              code: error.code,
              details: error.details,
              hint: error.hint,
              message: error.message
            });
        } else {
          console.log('Dream log successfully inserted:', data);
        }
      }
    } catch (error) {
      console.error('Error generating Gemini content:', error);
      Alert.alert("Error", "Failed to generate content from Gemini API.");
    }
    setIsLoading(false);
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
               <Text>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.pageButton} onPress={() => handleNavigate('./gemini')}>
               <Text>Textual Dream Interpretation Page</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.pageButton} onPress={() => handleNavigate('./gooey')}>
                <Text>Visual Dream Interpretation Page</Text>
            </TouchableOpacity>

            <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </View>
      </Modal>


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
        <Text> I fully acknowledge that this is for entertainment only!</Text>
      </View>

      {/* Gemini API Section */}
      <View>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color:'#C8A2C8'  }}>
          Input your dream details below to get your dream interpreted!
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
    color: 'blue',
    textDecorationLine: 'underline',
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
