import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDNJmT7I2wTV243Ruq3LANVk8zVXBx-tLk",
    authDomain: "react-twitter-35c78.firebaseapp.com",
    databaseURL: "https://react-twitter-35c78.firebaseio.com",
    projectId: "react-twitter-35c78",
    storageBucket: "react-twitter-35c78.appspot.com",
    messagingSenderId: "312255357950",
    appId: "1:312255357950:web:111f377bdb1f1196e156af"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();