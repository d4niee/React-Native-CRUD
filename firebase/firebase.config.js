
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDWr_geqroXLbFbHRAv1FImuh_lzUELFw",
  authDomain: "exercise-react-native-b374e.firebaseapp.com",
  projectId: "exercise-react-native-b374e",
  storageBucket: "exercise-react-native-b374e.appspot.com",
  messagingSenderId: "871377188684",
  appId: "1:871377188684:web:bf9b603d099e271ff941e9"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export default getFirestore()