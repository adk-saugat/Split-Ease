import { onAuthStateChanged, updateProfile } from "firebase/auth"
import { useState, createContext, useEffect } from "react"
import { auth, signOutUser } from "../utils/firebase-utils"

const defaultActiveUser = {
  displayName: "Guest",
  uid: "",
  email: "",
}

export const UserContext = createContext({
  activeUser: defaultActiveUser,
  setActiveUser: () => {},
})

const UserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(defaultActiveUser)

  const value = {
    activeUser,
    setActiveUser,
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { displayName, uid, email } = currentUser
        setActiveUser({ displayName, uid, email })
      } else {
        setActiveUser(defaultActiveUser)
      }
    })
    return unsubscribe
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export default UserProvider
