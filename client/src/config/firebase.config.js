// import { getApp, getApps, initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSEAFING_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

// const storage = getStorage(app);

// export { app, storage };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH9esO-s1UGuoWHv8oezr6CrOyUdF-y9Y",
  authDomain: "restaurant-app-d5d40.firebaseapp.com",
  databaseURL: "https://restaurant-app-d5d40-default-rtdb.firebaseio.com",
  projectId: "restaurant-app-d5d40",
  storageBucket: "restaurant-app-d5d40.appspot.com",
  messagingSenderId: "608290317137",
  appId: "1:608290317137:web:9a748d44a3f3fe04d96970"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth,provider,app}
