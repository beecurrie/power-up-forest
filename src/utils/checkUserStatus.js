import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '/config/firebaseApp.config.js';

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export default function CheckLoggedInUser() {
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        console.log("User is signed in as :" + user.uid);
        const uid = user.uid;
        return uid;

    } else {
        // User is signed out
        console.log("No user is signed in");
        return false;
    }
    });
}