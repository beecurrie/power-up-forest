import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBkct9EHb456xynI7kUdG7lnMH4FVCDHo",
  authDomain: "power-up-forest.firebaseapp.com",
  projectId: "power-up-forest",
  storageBucket: "power-up-forest.appspot.com",
  messagingSenderId: "640072649688",
  appId: "1:640072649688:web:160b2cdf21a1b449ab00ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var q = query(collection(db, "users"));
var querySnapshot = await getDocs(q);

var list = "";
querySnapshot.forEach((doc) => {
    list += doc.id + " => " + doc.data() + "\n"
});


q = query(collection(db, "tasks"));
querySnapshot = await getDocs(q);

var tasklist = "";
querySnapshot.forEach((doc) => {
    tasklist += doc.id + " => " + doc.data() + "\n"
});

export default function Home() {
  
    return (
      <div>
        <h1>Users</h1>
        <ul>
            <pre>{list}</pre>
        </ul>
        <h1>Tasks</h1>
        <ul>
            <pre>{tasklist}</pre>
        </ul>
      </div>
    );
  }