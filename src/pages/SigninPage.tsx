import React from 'react';
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'

import { signInWithEmailAndPassword } from 'firebase/auth';
import api from '../../api';
export default function LoginPage({ navigation }: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [errors, setErrors] = React.useState<string[]>([]);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      setErrors(['Please fill in all fields', ...errors]);
      return;
    }

    signInWithEmailAndPassword(api.auth, email, password)
      .then(async () => {
        console.log('User signed in');
        navigation.navigate('Home');
      })
      .catch(error => {
        setErrors([error.message, ...errors]);
      });
  };
  return (
    <Background>
      <Header>Welcome</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        onChangeText={(text: React.SetStateAction<string>) => {
          setErrors([]);
          setEmail(text);
        }}
        value={email}
        error={errors.length > 0}
        errorText={errors.map((error, index) => {
          return <Text key={index}>{error}</Text>;
        })}

        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description={undefined} />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        error={errors.length > 0}
        onChangeText={(text: React.SetStateAction<string>) => {
          setErrors([]);
          setPassword(text);
        }}
        errorText={errors.map((error, index) => {
          return <Text key={index}>{error}</Text>;
        })}
        description={undefined}
        secureTextEntry
      />

      {/* {errors.map((error, index) => {
        return <Text key={index}>{error}</Text>;
      })} */}

      <Button onPress={handleLogin} mode={undefined} style={undefined}>
        Login
      </Button>

      <Button
        title="Signup"
        onPress={() => navigation.navigate('SignUp')}
        mode={undefined}
        style={undefined}>
        Sign Up
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})