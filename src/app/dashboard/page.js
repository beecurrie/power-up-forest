"use client"

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import { firebaseConfig } from '/config/firebaseApp.config.js';
import { initializeApp } from 'firebase/app';
import { useRouter } from 'next/navigation';
import CheckLoggedInUser from 'src/utils/checkUserStatus.js';
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import "./dash.css";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);




// function TableName() {
//     return (
//         <>task_name</>
//     );
// }

function TableRow({ task }) {
    return (
        <tr>
            <td>{ task["task_name"] }</td> {/* task_name */}
            <td>{ task["task_start"] }</td> {/* task_start */}
            <td>{ task["task_end"] }</td> {/* task_end */}
            <td>{ task["task_notes"] }</td> {/* task_notes */}
            <td>X</td>
        </tr>
    );
}

function TableResults({ TaskList }) {
    const rows = [];
    if (TaskList.length == 0) {
        return (
            <>
            <p>No tasks found!</p>
            </>
        );
    }
    TaskList.forEach((task) => {
        rows.push(<TableRow task={task} />);
    });
    return (
        <table>
            <thead>
                <tr>
                    <th>task_name</th>
                    <th>task_start</th>
                    <th>task_end</th>
                    <th>task_notes</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
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
    

    var TASKLIST = [];
    console.log("uid: " + uid)
    var q = query(collection(db, "tasks"), where("user_uid", "==", uid));
    var querySnapshot = getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            TASKLIST.push(doc.data());
        });
    });

    console.info(TASKLIST);

    useEffect(() => {
        
    }, []);

    return (
        <div>
            <h1>Welcome to your Dashboard!</h1> 
            <p id="userBanner">
                Logged in as: <span id="user">{uid}</span> <button id="logout" onClick={callSignOut}>Log Out</button>
            </p>

            <button id="task">Add New Task +</button>
            {/* need to get all of the tasks associated with the user id*/}
            
           <div id="userTasks"> <h3>Your Tasks</h3>
           <TableResults TaskList={TASKLIST} /></div>
            

        </div>
    );
}