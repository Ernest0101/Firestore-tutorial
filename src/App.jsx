import { useState ,useEffect } from 'react'

import './App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, doc, getDoc, updateDoc} from "firebase/firestore";


const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ,
  messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ,
  appId:import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
//updates specific fields






function App() {
  const [name,setName] = useState();
  useEffect(()=>{

    async function testFirestore(){

      const docRef=doc(db,"testCollection", "testDocument");
      const docSnap= await getDoc(docRef);

      // update specific fields
      await updateDoc(docRef,{
        age:"9002",
        name:"Mary Mary Contrary"
      });

      if (docSnap.exists()){
        setName(docSnap.data().name);
      }else{
        console.log("No such document")
      }
    }
    testFirestore();
      },[]);

  return (
    <>
      <p>Firestore Check {name}</p>
    </>
  )
}

export default App
