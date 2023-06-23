import { getAuth, signOut } from "firebase/auth";
import { firebaseConfig } from '/config/firebaseApp.config.js';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export default function SignOutButton() {
    const callSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
            });
    }
    return (
        <div>
            <button onClick={callSignOut}>Sign Out</button>
        </div>
    );
}