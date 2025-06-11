import { useState ,useEffect } from 'react'
import './App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{createUserWithEmailAndPassword ,getAuth,signInWithEmailAndPassword, signOut,onAuthStateChanged} from'firebase/auth';
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
const auth = getAuth(app);
//updates specific fields


function App() {
  const [name,setName] = useState();
  const[email,setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [user,setUser] = useState(null);

  useEffect(()=>{
    const unsubscribe =onAuthStateChanged(auth, (currentUser)=>{
      if(currentUser){
        //user is signed in
        setUser(currentUser);
      }else{
        //user is signed out
        setUser(null)
      }
    })
    return ()=> unsubscribe();
  })


  //methods to  signUp
  const signUp = ()=>{
    createUserWithEmailAndPassword (auth, email, password )
        .then(userCredential =>{
          setUser(userCredential.user);
          console.log('User signed up', userCredential.user);
        } )
        .catch(error => {
          console.error('Error signing up:', error)
        })
  }

  //sign In
  const signIn =()=>{
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential=>{
            setUser(userCredential.user)
            console.log('User logged in:', userCredential.user);
  })
        .catch(error =>{
          console.error('Error logging in:,', error);
        })
  }

  //Sign out

  const logOut = ()=>{
    signOut(auth)
        .then(()=>{
          setUser(null);
          console.log('User signed out');
        })
        .catch(error=>{
          console.error('Error signing out:', error)
        });
  }

  //methods for signing up to auth
  return (
    <>
      <p>Firestore authentication</p>
      <div>

        {
          !user&&(
          <>
            <input type="text" placeholder={'Email'} value={email} onChange={(event)=> setEmail(event.target.value)}/>
            <input type="password" placeholder={'Password'} value={password} onChange={(event)=> setPassword(event.target.value)}/>
          <button onClick={signUp}>Sign Up</button>
          <button onClick={signIn}>sign In</button>
          </>
      )
      }

      </div>

      {
        user && (
            <div>
              <p>Logged in as: {user.email}</p>
              <button onClick={logOut}>Sign out</button>
            </div>
          )
      }
    </>
  )
}

export default App
