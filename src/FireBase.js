// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAybyAkGj6fccWeIVlEKo4DbUG9Ahym8yI",
  authDomain: "e-commercewebsite-dc28b.firebaseapp.com",
  projectId: "e-commercewebsite-dc28b",
  storageBucket: "e-commercewebsite-dc28b.appspot.com",
  messagingSenderId: "833644641415",
  appId: "1:833644641415:web:af9e89e62931b840a44c22",
  measurementId: "G-XVM6N96X7L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics };
