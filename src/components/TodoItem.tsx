import {View, Text, Button} from 'react-native';

import React from 'react';

import { TodoDocument } from '../../api';
import api from '../../api';
import { collection, deleteDoc, doc , updateDoc, onSnapshot} from 'firebase/firestore';

export default function Todo(item: TodoDocument) {
    const ref = doc(collection(api.firestore, "todos"), item.id);

    const [todo, setTodo] = React.useState<TodoDocument>(item);

    React.useEffect(() => {
        onSnapshot(ref, (doc) => {
            console.log("Current data: ", doc.data());

            setTodo({
                id: doc.id,
                ...doc.data(),
            } as TodoDocument);
        });
    }, []);

  const toggleCompleted = () => {
    updateDoc(doc(collection(api.firestore, "todos"), todo.id), {
        done: !todo.done
    });
  };

  const handleDelete = () => {
    deleteDoc(doc(collection(api.firestore, "todos"), todo.id));
  };

  return (
    <View>
        <Text>{todo.description}</Text>
        <Text>
            {
                todo.done ? 'Done!' : "Not Done"
            }
        </Text>
      
   
        <Button title={ todo.done ? "Mark un-done" : "Mark Done" } onPress={toggleCompleted} />
        {
            todo.done ? <Button title="Delete" color={"red"} onPress={handleDelete} /> : null
        }
    </View>
    
   

        
  );
}
