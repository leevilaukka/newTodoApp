/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import {NavigationContainer} from '@react-navigation/native';
 import {createStackNavigator} from '@react-navigation/stack';
 import React from 'react';
 import {Button, StyleSheet} from 'react-native';
 import AboutPage from './pages/AboutPage';
 import CreateTodo from './pages/CreateTodo';
 import HomePage from './pages/HomePage';
 import LoginPage from './pages/LoginPage';
 import SignupPage from './pages/SignupPage';
 import WelcomePage from './pages/WelcomePage';
 
 const Stack = createStackNavigator();
 
 const App = () => {
   return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="HomePage">
         <Stack.Screen
           name="SignupPage"
           component={SignupPage}
           options={{
             title: 'Sign Up',
           }}
         />
         <Stack.Screen
           name="LoginPage"
           component={LoginPage}
           options={{
             title: 'Login',
           }}
         />
         <Stack.Screen
           name="CreateTodoPage"
           component={CreateTodo}
           options={{
             title: 'Create Todo',
           }}
         />
         <Stack.Screen
           name="HomePage"
           component={HomePage}
           options={{
             title: 'Todo App',
           }}
         />
         <Stack.Screen
           name="WelcomePage"
           component={WelcomePage}
           options={{
             headerShown: false,
           }}
         />
         <Stack.Screen
           name="AboutPage"
           component={AboutPage}
           options={{
             title: 'Concact',
           }}
         />
       </Stack.Navigator>
     </NavigationContainer>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
 