import app from 'firebase/app'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDXrpKGbvtRfTnRuBxMLdjtI-HDyffvC2w",
    authDomain: "proyectoamigos-ecc22.firebaseapp.com",
    projectId: "proyectoamigos-ecc22",
    storageBucket: "proyectoamigos-ecc22.appspot.com",
    messagingSenderId: "984781860332",
    appId: "1:984781860332:web:31bc4a98a884bacfe0a4c9"
  };
  
app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()