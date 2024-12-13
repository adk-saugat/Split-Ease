import { onAuthStateChanged } from "firebase/auth"
import { useState, createContext, useEffect } from "react"
import { auth } from "../utils/firebase-utils"

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null)

  const value = {
    activeUser,
    setActiveUser,
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setActiveUser(currentUser)
    })
    return unsubscribe
  })
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export default UserProvider
