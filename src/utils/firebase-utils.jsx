import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAvdT4q9socsK0m4PwbiDRbNQdYQ_g09VY",
  authDomain: "split-ease-6f003.firebaseapp.com",
  projectId: "split-ease-6f003",
  storageBucket: "split-ease-6f003.firebasestorage.app",
  messagingSenderId: "900597394116",
  appId: "1:900597394116:web:a2ac4efd8a183fd73e3791",
  measurementId: "G-KE18SFTG9M",
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
