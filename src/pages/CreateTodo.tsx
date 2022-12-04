import React from 'react';
import { Text } from 'react-native';
import TextInput from '../components/TextInput';
import Background from '../components/Background';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import api from "../../api"

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
    <Background>
      {api.auth.currentUser?.email ? (
        <>

          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            errorText={""}
            description={""} />

          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            errorText={""}
            description={""} />

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
        </>
      ) :
        (
          <Paragraph>You must be logged in to create a todo</Paragraph>
        )}
    </Background>
  );
}
