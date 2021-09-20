import firebase from 'firebase';
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBssSvAfzcghiZ3z4uczsodtgKXmksJMR0",
    authDomain: "my-accounts-3ab74.firebaseapp.com",
    projectId: "my-accounts-3ab74",
    storageBucket: "my-accounts-3ab74.appspot.com",
    messagingSenderId: "302307740392",
    appId: "1:302307740392:web:839a836e5dae0e7527d75d"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
} 

export default firebase;
