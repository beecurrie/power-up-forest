"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { getAuth, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { firebaseConfig } from '/config/firebaseApp.config.js';
import { initializeApp } from 'firebase/app';
import CheckLoggedInUser from 'src/utils/checkUserStatus.js';

const app = initializeApp(firebaseConfig);
import './form.css';
import SignOutButton from './signout.js';
const auth = getAuth();

const validateEmail = (email) => {
    // from https://stackoverflow.com/questions/46155
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
// where should the css file for this component be?

export default function Form({ formType }) {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const loginSuccessURL = "/dashboard";
    const router = useRouter()

    // need to set the persistence to session
    setPersistence(auth, browserSessionPersistence);
    const loginUser = (email, password) => {
        signInWithEmailAndPassword (auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if (user) {
                // redirect to dashboard
                console.info(user);
                router.push(loginSuccessURL);
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("ErrorCode :" + errorCode);
            console.log("ErrorMessage :" + errorMessage);
        });
    }
    const createUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if (user) {
                // redirect to dashboard
                redirect(loginSuccessURL);
                console.info(user);
            }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("ErrorCode :" + errorCode);
                console.log("ErrorMessage :" + errorMessage);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // basic validation
        if (!Boolean(validateEmail(email))) {
            // update the email error state
            setEmailError("A valid email is required");
            return;
        }
        if (password === "" && password.length < 6) {   
            setPasswordError("Password is required and must be at least 6 characters");
            return;
        }

        if (formType === "login") {
            loginUser(email, password);
        } else if (formType === "signup") {
            createUser(email, password);
        }
    }
    return (
    <>
    <form className="loginSignupForm" onSubmit={handleSubmit}>
    <div>
        <label htmlFor="email">Email:</label>
        <input
            type="text"
            id="email"
        />
        <span className="formError">{ emailError }</span>
    </div>
    <div>
        <label htmlFor="password">Password:</label>
        <input
            type="password"
            id="password"
        />
        <span className="formError">{ passwordError }</span>
    </div> 
        <button type="submit">{formType === "login" ? "Login" : "Signup"}</button>
    </form>

    <button onClick={ CheckLoggedInUser }>Check user</button>

    <SignOutButton />
    
    </>
    )
}