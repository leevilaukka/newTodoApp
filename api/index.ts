import { FirebaseOptions, initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyAjWhCyAfw638TQkn1K7sPbQRB-dHzY8pw",
    authDomain: "todomanagerreactnative.firebaseapp.com",
    projectId: "todomanagerreactnative",
    storageBucket: "todomanagerreactnative.appspot.com",
    messagingSenderId: "34695591190",
    appId: "1:34695591190:web:5a58be9d66784e972bcc37",
};

const app = initializeApp(firebaseConfig);

/**
 * Firebase API
 * Auth: https://firebase.google.com/docs/reference/js/firebase.auth
 * Firestore: https://firebase.google.com/docs/reference/js/firebase.firestore
 */
const api = {
    app,
    auth: getAuth(app),
    firestore: getFirestore(app),
};

// Type annotation for TodoDocument
export type TodoDocument = {
    id: string;
    title: string;
    done: boolean;
    dueBy: Date;
    author: string;
    receiver: string;
    description: string;
};



export default api;