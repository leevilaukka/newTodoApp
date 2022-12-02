import React from 'react';
import {View, Text, Button } from 'react-native';
import TextInput from '../components/TextInput';

import api from "../../api"

import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function CreateTodo({navigation}: any) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleCreateTodo = () => {
    if (title === '' || description === '') {
      setErrors(['Please fill in all fields', ...errors]);
      return;
    }
    // create todo and save to firebase

    addDoc(collection(api.firestore, "todos"), {
        title,
        description,
        owner: api.auth.currentUser?.email,
        completed: false,
        createdAt: Timestamp.fromDate(new Date()),
      })
      .then(() => {
        console.log('Todo created!');
        navigation.navigate('Home');
      });
  };

  return (
    <View>
      {api.auth.currentUser?.email ? (
        <View>
            <Text>Title</Text>
            <TextInput value={title} onChangeText={setTitle} errorText={"Error"} description={"Todo Title"}/>
            
            <Text>Description</Text>
            <TextInput value={description} onChangeText={setDescription}  errorText={"Error"} description={"Todo Description"}/>
            
            {errors.map((error, index) => {
              return <Text key={index}>{error}</Text>;
            })}

            <Button title="Create Todo" onPress={handleCreateTodo} />
        </View>
      ) : (
        <Text>You must be logged in to create a todo</Text>
      )}
    </View>
  );
}
