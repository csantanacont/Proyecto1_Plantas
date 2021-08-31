// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUXLZ0z1-Jz1F3WLOj5Y1xLhlfEK3E5sg",
  authDomain: "crud-ac820.firebaseapp.com",
  projectId: "crud-ac820",
  storageBucket: "crud-ac820.appspot.com",
  messagingSenderId: "685801349033",
  appId: "1:685801349033:web:0a4327dc0cf41a260feeb8",
  measurementId: "G-H4TV6NZCF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}