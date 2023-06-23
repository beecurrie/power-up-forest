"use client"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '/config/firebaseApp.config.js';
import React, { useState } from 'react';

// form is in components/form.js of the src folder.

import Form from 'src/components/form.js';
// the firebase config is stored in config/firebaseApp.config.js. fetch it.

const app = initializeApp(firebaseConfig);


const auth = getAuth();



export default function Home() {

    return (
        <div>
            <h1>Power Up Forest sign up</h1>
            <div>
                <div className="signup">
                    <Form formType="signup" />
                </div>
            </div>
        </div>
    );
}