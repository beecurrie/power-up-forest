"use client"

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import { firebaseConfig } from '/config/firebaseApp.config.js';
import { initializeApp } from 'firebase/app';
import { useRouter } from 'next/navigation';
import CheckLoggedInUser from 'src/utils/checkUserStatus.js';
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import Projects from "src/components/projects.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

function TopBar() {
    return (
        <div>
            <button>← Back</button>
        </div>
    );
}

export default function Home() {
    const router = useRouter();
    const [uid, setUID] = useState("");

    const callSignOut = async () => {
        await signOut(auth).then(() => {
            console.log("User signed out");
            // with router, redirect to the main page
            router.push("/");
        }).catch((error) => {
            console.log("Error signing out: " + error);
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (userData) => {
            console.info(userData);
            if (userData) {
                // User is signed in
                let userID = userData.uid;
                console.log("User is signed in as :" + userID);
                setUID(userID);
            } else {
                // if the user is not logged in we redirect them to the login page
                console.log("User is not logged in. Redirecting to login page");
                window.location.href = "/login";
                router.push("/login");
            }

        })
    }, []);


    return (
        <div>
            <h1>Power Up Forest Dashboard</h1>
            <p>
                (debug) Logged in as: <span id="user">{uid}</span>
            </p>

            <div>
                <TopBar />
                <Projects userID={uid}/>
            
                
            </div>
            <button onClick={callSignOut}>Log out</button>

        </div>
    );
}