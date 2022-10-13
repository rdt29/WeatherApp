import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Screen/SplashScreen';
import Weather from '../Screen/Weather';


const MainStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator>

    <Stack.Screen
        name="splashscreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />


      <Stack.Screen
        name="Weather"
        component={Weather}
        options={{headerShown: false} }
      />
   
    </Stack.Navigator>
  </NavigationContainer>
  );
};
export default MainStack;
