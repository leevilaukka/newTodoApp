import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupPage from './src/pages/SignupPage';
import SigninPage from './src/pages/SigninPage';
import HomePage from './src/pages/HomePage';
import { DatabaseExample } from './src/pages/DatabaseExample';
import CreateTodo from './src/pages/CreateTodo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >


        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: true }} />

        <Stack.Screen
          name="Login"
          component={SigninPage}
          options={{ headerShown: true }} />

        <Stack.Screen
          name="SignUp"
          component={SignupPage}
          options={{ headerShown: true }} />

        <Stack.Screen
          name="Database Example"
          component={DatabaseExample}
          options={{ headerShown: true }} />

        <Stack.Screen 
          name="Create Todo"
          component={CreateTodo}
          options={{ headerShown: true }} />
        

      </Stack.Navigator>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
