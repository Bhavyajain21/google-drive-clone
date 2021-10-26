import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDs0aD4kJDd3xPHtqMfkPyNKg-Cn-brRq0",
    authDomain: "drive-clone-315bb.firebaseapp.com",
    projectId: "drive-clone-315bb",
    storageBucket: "drive-clone-315bb.appspot.com",
    messagingSenderId: "759108260042",
    appId: "1:759108260042:web:105fe201914f0b5aa52433"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider };
