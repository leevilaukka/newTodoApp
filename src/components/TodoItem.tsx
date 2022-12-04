import { View, Text } from 'react-native';
import Button from './Button';
import Paragraph from './Paragraph';
import React from 'react';

import { TodoDocument } from '../../api';
import api from '../../api';
import { collection, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import Background from './Background';

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
        <Background>
            <Paragraph>{todo.title} - {todo.description}</Paragraph>

            <Paragraph>
                {
                    todo.done ? 'Done!' : "Not Done"
                }
            </Paragraph>


            <Button onPress={toggleCompleted} mode={undefined} style={undefined}>
                {
                    todo.done ? "Mark un-done" : "Mark Done"
                }
            </Button>
            {
                todo.done ?
                    <Button color={"red"}
                        onPress={handleDelete}
                        mode={undefined}
                        style={undefined}>
                        Delete
                    </Button> : null
            }
        </Background>




    );
}
