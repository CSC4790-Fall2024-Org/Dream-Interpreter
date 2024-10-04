import React from 'react';
import Index from './app/index.tsx'; 
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GooeyInterpretation from './app/animation.tsx';
import GeminiInterpretation from './app/gemini.tsx';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Index">
        <Drawer.Screen name="Home" component={Index} />
        <Drawer.Screen name="Gemini Interpretation" component={GeminiInterpretation} />
        <Drawer.Screen name="Gooey Animation" component={GooeyInterpretation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
