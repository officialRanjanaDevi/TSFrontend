// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: process.env.LIVEVIDEO_APIKEY,
  authDomain: process.env.LIVEVIDEO_AUTHDOMAIN,
  projectId: process.env.LIVEVIDEO_PROJECTID,
  storageBucket: 'trialshoppy-75e24.appspot.com',
  messagingSenderId: process.env.LIVEVIDEO_MESSAGINGSENDERID,
  appId: process.env.LIVEVIDEO_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;