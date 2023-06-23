import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '/config/firebaseApp.config.js';

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export default function CheckLoggedInUser() {
    const user = auth.currentUser;
    if (user) {
        console.log("User is logged in as :" + user.uid);
        return (
            <>
                {user.uid}
            </>
        )
    } else {
        console.log("No user is logged in");
        return false;
    }
}