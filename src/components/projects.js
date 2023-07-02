import ListItem from "./generic-list.js";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, getDocs, query, where, getDocsFromServer, onSnapshot, querySnapshot } from "firebase/firestore";
import { firebaseConfig } from '/config/firebaseApp.config.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);





// this file will generate the projects list in the dashboard page
const addProject = async (e) => {
    e.preventDefault();
    const project_name = document.getElementById("project_name").value;
    const project_tasks = [];
    const uid = auth.currentUser.uid;
    const docRef = await addDoc(collection(db, "projects"), {
        "project_name": project_name,
        "project_tasks": project_tasks,
        "user_id": uid,
    });
    console.log("Document written with ID: ", docRef.id);
}


function loadTasks() {
    
}


function addProjectBox() {
    // this function will add a new project box to the list
    
}

export default function Projects({userID}) {
    // this fucntion will get the projects from the database and then display them in a list using ListItem from generic-list
    // the list will be generated using the map function
    // the data is fetched from the firebase database
    
    // const projectData = getProjects(userID);
    // useEffect(async () => {
        //     const projectList = await Promise.resolve(projectData);
        //     console.log(projectList);
        // }, []);
        
    const [projectList, setProjectList] = useState([]);
    console.log(userID);
    useEffect(() => {
        const q = query(collection(db, 'projects'), where('user_id', '==', userID));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let itemsArr = [];

            querySnapshot.forEach((doc) => {
                itemsArr.push({ ...doc.data(), id: doc.id });
            });
            setProjectList(itemsArr);
            return () => unsubscribe();
        });
    }, [userID]);
    console.log(projectList);

    return (
        <div className="project-box">
            <div className="list">
                {projectList.map((project) => (
                    <Link href={"/dashboard/projects/" + project.id}>
                        <ListItem key={project.id} item_name={project.project_name} />
                    </Link>

                ))}
                {/* add new project item */}
                <ListItem key="projectAdd" item_name={(
                    <>
                    <input type="text" id="project-name" placeholder="Project Name" />
                    <button id="add-project" onClick={addProject}>Add Project</button>
                    </>
                )} />
            </div>
        </div>
    );
    
}
