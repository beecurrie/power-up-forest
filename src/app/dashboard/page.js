"use client"

import { getAuth } from "firebase/auth";
import { firebaseConfig } from '/config/firebaseApp.config.js';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

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


const user = auth.currentUser;
if (!user) {
    // if the user is not logged in we redirect them to the login page
    console.log("Redirecting to login page");
    
}
console.log("Result from user: " + user);
console.log("Result from user.uid: " + user.uid);

var TASKLIST = [];

var q = query(collection(db, "tasks"), where("user_uid", "==", user.uid));
var querySnapshot = await getDocs(q);

querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    TASKLIST.push(doc.data());
});

export default function Home() {

    console.info(TASKLIST);

    return (
        <div>
            <h1>Power Up Forest Dashboard</h1>
            <p>
                Logged in as: <span id="user">{CheckLoggedInUser()}</span>
            </p>

            <button>Add task +</button>

            {/* need to get all of the tasks associated with the user id*/}
            
            <TableResults taskList={TASKLIST} />

        </div>
    );
}