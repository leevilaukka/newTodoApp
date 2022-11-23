import { User } from "firebase/auth";
import React from "react";
import { Button, View, Text } from "react-native";
import api from "../api";

export default function HomePage({navigation}: any) {
    const [user, setUser] = React.useState<User>();

    React.useEffect(() => {
        api.auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } 
        });
    }, []);

    return (
        <View>
            <Text>Home Page</Text>
            <Button title="Sign In" onPress={() => navigation.navigate('Sign In')} />
            <Button title="Sign Up" onPress={() => navigation.navigate('Sign Up')} />
            {
                user && <Text>{user.email}</Text>
            }
        </View>
    );
}
