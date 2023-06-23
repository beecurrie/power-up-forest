"use client"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '/config/firebaseApp.config.js';
import React, { useState } from 'react';

import Form from 'src/components/form.js';

// the firebase config is stored in config/firebaseApp.config.js. fetch it.

const app = initializeApp(firebaseConfig);


const auth = getAuth();


export default function Home() {

    return (
        <div>
            <h1>Power Up Forest login</h1>
            <div>
                <div className="login">
                    <Form formType="login" />
                </div>
            </div>
        </div>
    );
}