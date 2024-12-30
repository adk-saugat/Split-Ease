import { initializeApp } from "firebase/app"
import {
  collection,
  getDoc,
  getFirestore,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
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

export const signOutUser = async () => {
  await signOut(auth)
}

// FireStore Database

export const db = getFirestore(app)

export const findUserByEmail = async (email) => {
  const usersRef = collection(db, "users")
  const q = query(usersRef, where("email", "==", email))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const user = querySnapshot.docs[0].data()
    return user
  }
  return null
}

export const getCollectionData = async (collectionName) => {
  const collectionRef = collection(db, collectionName)
  const querySnapshot = await getDocs(collectionRef)

  return querySnapshot.docs.map((doc) => doc.data())
}

export const documentExists = async (collectionName, uid) => {
  const collectionRef = collection(db, collectionName)
  const docRef = doc(collectionRef, uid)
  const docSnapshot = await getDoc(docRef)
  return docSnapshot.exists()
}

export const createUserDocument = async (uid, displayName, email) => {
  !(await documentExists("users", uid)) &&
    (await setDoc(doc(collection(db, "users"), uid), {
      uid,
      displayName,
      email,
      groups: [],
    }))
}

export const createGroupDocument = async (groupId, groupName, user, member) => {
  if (!(await documentExists("groups", groupId))) {
    await setDoc(doc(db, "groups", groupId), {
      groupId,
      groupName,
      members: [
        { uid: user.uid, displayName: user.displayName },
        { uid: member.uid, displayName: member.displayName },
      ],
    })
    const userIds = [user.uid, member.uid]

    userIds.forEach(async (userId) => {
      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, {
        groups: arrayUnion({ groupId, groupName }),
      })
    })
  }
}
