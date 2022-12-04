import React from 'react';

import { View } from 'react-native';
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'


import api from "../../api"
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function CreateTodo({ navigation }: any) {
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
    <>
      {api.auth.currentUser?.email ? (
        <Background>
          <Header>Todo plan</Header>
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            errorText={undefined}
            description={undefined} />


          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            errorText={undefined}
            description={undefined} />



          {errors.map((error, index) => {
            return <Text key={index}>{error}</Text>;
          })}

          <Button
            title="Create Todo"
            onPress={handleCreateTodo}
            mode={undefined}
            style={undefined}>
            Create Todo
          </Button>
        </Background>
      ) : (
        <Text>You must be logged in to create a todo</Text>
      )

      }
    </>
  );
}
