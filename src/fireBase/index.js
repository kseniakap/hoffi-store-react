import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBbNRdBWYn293SIHchYKDF68ka_R1pEbrc",
  authDomain: "hoffistore-7cd26.firebaseapp.com",
  projectId: "hoffistore-7cd26",
  storageBucket: "hoffistore-7cd26.appspot.com",
  messagingSenderId: "664811814606",
  appId: "1:664811814606:web:4bf620155e2126a9af5a9f",
};

const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app)
export {imgDB}