import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDEobeNVHfvQ1eH7-sMnSr-iePR9_y3APw",
    authDomain: "dream-records-private-limited.firebaseapp.com",
    projectId: "dream-records-private-limited",
    storageBucket: "dream-records-private-limited.appspot.com",
    messagingSenderId: "487884364438",
    appId: "1:487884364438:web:8c85eb4d2f3f027e1780b7",
    measurementId: "G-WFPYE302ZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;