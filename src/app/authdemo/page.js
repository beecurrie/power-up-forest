export default function Home() {
    return (
        <div>
            <script>
                
            </script>
            <h1>Auth Demo</h1>

        </div>
    );
}

// const firebaseui = import('firebaseui');

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


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(auth);

