import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.AUTHDOMAIN,
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID,
  measurementId: import.meta.env.MEASUREMENT_ID,
=======
  apiKey: "AIzaSyAvdT4q9socsK0m4PwbiDRbNQdYQ_g09VY",
  authDomain: "split-ease-6f003.firebaseapp.com",
  projectId: "split-ease-6f003",
  storageBucket: "split-ease-6f003.firebasestorage.app",
  messagingSenderId: "900597394116",
  appId: "1:900597394116:web:a2ac4efd8a183fd73e3791",
  measurementId: "G-KE18SFTG9M",
>>>>>>> 594595ed49f027f0570a6d8ef31001a039711e8b
}

const app = initializeApp(firebaseConfig)
const googleProvider = new GoogleAuthProvider()

export const auth = getAuth(app)

export const googleSignIn = () => {
  return signInWithPopup(auth, googleProvider)
}

export const emailPasswordSignIn = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}
