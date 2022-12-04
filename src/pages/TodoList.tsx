import React from 'react';
import api, { TodoDocument } from '../../api';
import Background from '../components/Background';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Text } from 'react-native';
import TodoItem from '../components/TodoItem';

export const TodoList = () => {
    const [data, setData] = useState<TodoDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{ message: string }>();
    const q = query(collection(api.firestore, "todos"),
        where("owner", "==", api.auth.currentUser?.email));

    useEffect(() => {
        const snapshot = getDocs(q);
        snapshot
            .then((doc) => {
                setLoading(false);
                if (!doc.empty) {
                    const data = doc.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        } as TodoDocument;
                    });
                    console.log(data);

                    setData(data as TodoDocument[]);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                setError(error);
            })
    }, []);

    return (
        <Background>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Something went wrong: {error.message}</Text>}
            {data &&
                <FlatList
                    data={data}
                    renderItem={({ item }) => <TodoItem {...item} />}
                    keyExtractor={(item) => item.id}
                />
            }
        </Background>
    );
};