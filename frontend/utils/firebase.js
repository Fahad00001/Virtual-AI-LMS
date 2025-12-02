// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_VIREBASE_APIKEY,
  authDomain: "loginvirtual-course.firebaseapp.com",
  projectId: "loginvirtual-course",
  storageBucket: "loginvirtual-course.firebasestorage.app",
  messagingSenderId: "847454747939",
  appId: "1:847454747939:web:68d563cd11fac4418ea096"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const provider=new  GoogleAuthProvider()

export { auth, provider }