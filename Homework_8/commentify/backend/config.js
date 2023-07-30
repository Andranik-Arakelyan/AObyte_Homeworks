import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbKpZzV3fzgIXSApGBBJWwLUBAkZtOD3I",
  authDomain: "commentify-8218e.firebaseapp.com",
  databaseURL: "https://commentify-8218e-default-rtdb.firebaseio.com",
  projectId: "commentify-8218e",
  storageBucket: "commentify-8218e.appspot.com",
  messagingSenderId: "682408658928",
  appId: "1:682408658928:web:804e65c7f786b10268ff35",
};

const application = initializeApp(firebaseConfig);
export const storage = getStorage(application);
