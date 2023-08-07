import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyA36GuJq1tPuqH_Vr88EnBMRKJ-yY8I3UU",
  authDomain: "crud-react-1c1ca.firebaseapp.com",
  databaseURL: "https://crud-react-1c1ca-default-rtdb.firebaseio.com",
  projectId: "crud-react-1c1ca",
  storageBucket: "crud-react-1c1ca.appspot.com",
  messagingSenderId: "491821999782",
  appId: "1:491821999782:web:8f2acc8d3e49b76fa5b667"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const storage=getStorage(app);