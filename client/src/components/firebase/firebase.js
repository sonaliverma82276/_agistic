import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const app = firebase.initializeApp({
    apiKey: "AIzaSyCdrJMB4vD1aWGOMM6r3ickS0lMQT_RJMM",
    authDomain: "frosthackdb.firebaseapp.com",
    projectId: "frosthackdb",
    storageBucket: "frosthackdb.appspot.com",
    messagingSenderId: "91260967403",
    appId: "1:91260967403:web:7fc78a81573d359257a1ae",
    measurementId: "G-9TEMYQ2CEK"
});

export default app;