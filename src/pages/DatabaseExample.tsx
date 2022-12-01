import api, { TodoDocument } from '../../api';

import { collection, doc, DocumentData, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { View, Text } from 'react-native';
import React from 'react';



export const DatabaseExample = () => {

    const [data, setData] = useState<TodoDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{ message: string }>();

    useEffect(() => {
        const snapshot = getDocs(collection(api.firestore, 'todos'));
        snapshot
            .then((doc) => {
                setLoading(false);
                if (!doc.empty) {
                    const data = doc.docs.map((doc) => doc.data());
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
        <View >
            {loading && <Text>Loading...</Text>}
            {error && <Text>Something went wrong: {error.message}</Text>}
            {data &&
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Text>{item.title}</Text>}
                    keyExtractor={(item) => item.title}
                />
            }
        </View>
    );
};