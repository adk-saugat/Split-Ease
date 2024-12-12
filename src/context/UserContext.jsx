import { useState, createContext } from "react"

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null)

  const value = {
    activeUser,
    setActiveUser,
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export default UserProvider
