import { initializeApp } from "firebase/app"
import {
  collection,
  getDoc,
  getFirestore,
  setDoc,
  doc,
} from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}

// Authentication

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

export const emailPasswordSignUp = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

// FireStore Database

export const db = getFirestore(app)

export const createUserDocument = async (email, uid) => {
  const collectionRef = collection(db, "user")

  const docRef = doc(collectionRef, uid)
  const docSnapshot = await getDoc(docRef)
  !docSnapshot.exists() &&
    (await setDoc(doc(collectionRef, uid), { email, uid }))
}
