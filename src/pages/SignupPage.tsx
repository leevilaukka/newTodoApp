import api from '../../api';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'



import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignupPage({ navigation }: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<string[]>([]);

  // Handle signup with email and password
  const handleSignup = async () => {
    if (email === '' || password === '') {
      setErrors(['Please fill in all fields', ...errors]);
      return;
    }

    await createUserWithEmailAndPassword(api.auth, email, password)
      .then(user => {
        console.log(user);
        navigation.navigate('HomePage', { user });
      })
      .catch(error => {
        setErrors([error.message, ...errors]);
      });
  };


  return (
    <Background>
      <Header>Signup Page</Header>
      {/* login form */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text: string) => {
          if (text.length > 0) {
            setErrors(errors.filter(error => error !== 'Email cannot be empty'));
          } else {
            setErrors(['Email cannot be empty', ...errors]);
          }
          setEmail(text);
          setErrors([]);
        }}
        errorText={undefined}
        description={undefined} />

      <TextInput
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={(text: string) => {
          if (text.length < 6) {
            setErrors(['Password must be at least 6 characters']);
          } else {
            setErrors([]);
          }
          setPassword(text);
          setErrors([]);
        }}
        errorText={undefined}
        description={undefined} />



      {errors.map((error, index) => {
        return <Text key={index}>{error}</Text>;
      })}

      {/* login button */}

      <Button
        title="Signup"
        disabled={errors.length > 0}
        onPress={handleSignup}
        mode={undefined}
        style={undefined}>

        Sign Up
      </Button>

      <Button
        title='To home'
        onPress={() => navigation.navigate('Home')}
        mode={undefined}
        style={undefined}>

        Back
      </Button>

    </Background>
  );
}
