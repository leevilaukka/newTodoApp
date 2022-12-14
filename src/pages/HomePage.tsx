import { User } from "firebase/auth";
import React from "react";
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import api from "../../api";
import { signOut } from "firebase/auth";

export default function HomePage({ navigation }: any) {
    const [user, setUser] = React.useState<User>();

    React.useEffect(() => {
        api.auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    const SignOut = () => {
        signOut(api.auth).then(() => {
            // sign out
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <Background>
            <Header>
                Welcome, {
                    user && <Text>{user.email}</Text>
                }
            </Header>

            <Button
                title="Todo List"
                onPress={() => navigation.navigate('Todo List')}
                mode={undefined}
                style={undefined}>
                Todo List
            </Button>

            <Button
                title="Create Todo"
                onPress={() => navigation.navigate('Create Todo')}
                mode={undefined}
                style={undefined}>
                Create Todo
            </Button>

            <Button
                title="Sign out"
                onPress={() => navigation.navigate("Login")}
                mode={undefined}
                style={undefined}>
                Sign out
            </Button>
        </Background>
    );
}
