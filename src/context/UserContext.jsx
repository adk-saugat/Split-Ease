import { onAuthStateChanged } from "firebase/auth"
import { useState, createContext, useEffect } from "react"
import { auth } from "../utils/firebase-utils"

const defaultActiveUser = {
  displayName: "",
  uid: "",
  email: "",
}

export const UserContext = createContext({
  activeUser: defaultActiveUser,
  setActiveUser: () => {},
})

const UserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(defaultActiveUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const { displayName, uid, email } = currentUser
        setActiveUser({
          displayName: displayName,
          uid: uid,
          email: email,
        })
      } else {
        setActiveUser(defaultActiveUser)
      }
    })
    return () => unsubscribe()
  }, [])
  const value = {
    activeUser,
    setActiveUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export default UserProvider
