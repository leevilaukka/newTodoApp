import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';

import { signInWithEmailAndPassword } from 'firebase/auth';
import api from '../api';


export default function LoginPage({navigation}: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [errors, setErrors] = React.useState<string[]>([]);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      setErrors(['Please fill in all fields', ...errors]);
      return;
    }

    signInWithEmailAndPassword(api.auth,email, password)
      .then(async () => {
        console.log('User signed in');
        navigation.navigate('Home');
      })
      .catch(error => {
        setErrors([error.message, ...errors]);
      });
  };
  return (
    <View>
        <Text>Email</Text>
        <TextInput value={email} onChangeText={(text) => {
          setErrors([]);
          setEmail(text);
        }} />
        <Text>Password</Text>
        <TextInput value={password} secureTextEntry onChangeText={(text) => {
          setErrors([]);
          setPassword(text);
        }} />
        {errors.map((error, index) => {
          return <Text key={index}>{error}</Text>;
        })}
    
       
        <Button title="Login" onPress={handleLogin} />
        <Button
          title="Signup"
          onPress={() => navigation.navigate('SignupPage')}
        />
    </View>
     
  );
}
