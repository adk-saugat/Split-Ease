import React, { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import { getCollectionData } from "../utils/firebase-utils"

export const GroupContext = createContext({
  groups: [],
  setGroups: () => {},
})

const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([])
  const { activeUser } = useContext(UserContext)

  useEffect(() => {
    const fetchGroups = async () => {
      const currentUser = await getCollectionData("users")
      const user = currentUser.find((user) => user.uid === activeUser.uid)
      const userGroups = user?.groups || []
      JSON.stringify(userGroups) !== JSON.stringify(groups) &&
        setGroups(userGroups)
    }
    fetchGroups()
  })
  const value = { groups, setGroups }
  return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
}

export default GroupProvider
