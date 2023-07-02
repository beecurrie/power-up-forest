"use client"
import ListItem from "src/components/generic-list.js";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, getDocs, query, where, getDocsFromServer, onSnapshot, querySnapshot } from "firebase/firestore";
import { firebaseConfig } from '/config/firebaseApp.config.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import React, { useState, useEffect } from 'react';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

async function getProjectTasks(projectID) {
    const docRef = doc(db, "projects", projectID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
    // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

async function getTaskData(taskIDList) {
    let taskList = [
        // {task_complete: boolean, task_name: string}
    ]; 
    for (let taskID of taskIDList) {
        const docRef = doc(db, "tasks", taskID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            taskList.push(docSnap.data());
        } else {
        // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    return taskList;
}
export default function Home( { params } ) {
    // get the project ID from the URL
    // get the project tasks from the database
    // display the project tasks in a list
    // the list will be generated using the map function

    // useEffect(() => {
    //     onAuthStateChanged(auth, (userData) => {
    //         console.info(userData);
    //         if (userData) {
    //             // User is signed in
    //             let userID = userData.uid;
    //             console.log("User is signed in as :" + userID);
    //             setUID(userID);
    //         } else {
    //             // if the user is not logged in we redirect them to the login page
    //             console.log("User is not logged in. Redirecting to login page");
    //             window.location.href = "/login";
    //             router.push("/login");
    //         }
    //     })
    // }, []);
    const [taskIDList, setTaskIDList] = useState([]);
    useEffect(() => {
        getProjectTasks(params.projectID).then(project => {
            setTaskIDList(project.taskIDs);
        });
    }, []);
    console.log(taskIDList);

    const [taskList, setTaskList] = useState([]);
    useEffect(() => {
        getTaskData(taskIDList).then(taskList => {
            setTaskList(taskList);
        });
    }, [taskIDList]);
    console.log(taskList);


    return (
        <div className="task-box">
            <h1>Tasks</h1>
            {taskList.map((task, index) => (
                <ListItem key={index} item_name={task.task_name} item_completed={task.task_complete}/>
            ))}
        </div>
    );        
}