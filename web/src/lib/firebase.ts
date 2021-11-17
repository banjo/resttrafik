// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "@firebase/auth";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC3n9zRSrLbSfp3s0X9IiwCM_5S5DTagL8",
    authDomain: "resttrafik.firebaseapp.com",
    projectId: "resttrafik",
    storageBucket: "resttrafik.appspot.com",
    messagingSenderId: "647364892310",
    appId: "1:647364892310:web:7f69c3b4907cf7ce4c54b7",
    measurementId: "G-TZ1M7086HJ",
};

firebase.initializeApp(firebaseConfig);
export const auth = getAuth(firebase.app());
export default firebase;
