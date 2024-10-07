import React from 'react';
import Index from './app/index'; 
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GooeyInterpretation from './app/gooey';
import GeminiInterpretation from './app/gemini';
//import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'; 

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        {console.log("Navigators are being set")}
        <Drawer.Screen name="Home" component={Index} />
        <Drawer.Screen name="Gemini" component={GeminiInterpretation} />  
        <Drawer.Screen name="Gooey" component={GooeyInterpretation} />  
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
