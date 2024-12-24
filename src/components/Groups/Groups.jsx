import { useState, useEffect } from "react"
import "./Groups.scss"
import CreateGroup from "../CreateGroup/CreateGroup"
import { getCollectionData } from "../../utils/firebase-utils"

const Groups = () => {
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [groups, setGroups] = useState([])

  useEffect(() => {
    return async () => {
      const groupsData = await getCollectionData("groups")
      const groups = groupsData.map((group) => {
        return {
          groupName: group.groupName,
          groupId: group.groupId,
        }
      })
      setGroups(groups)
    }
  }, [])
  return (
    <div className="group-container">
      <div className="group-dashboard">
        <button className="add-group-btn" onClick={() => setShowAddGroup(true)}>
          Add Group
        </button>
        <div className="group-info">
          <h2 className="group-text">Groups</h2>
          <div className="group-list">
            {groups.map((group) => (
              <li key={group.groupId}>{group.groupName}</li>
            ))}
          </div>
        </div>
      </div>
      {showAddGroup ? (
        <div className="group-content">
          <CreateGroup setShowAddGroup={setShowAddGroup} />
        </div>
      ) : (
        <div className="group-content">All group contents here!</div>
      )}
    </div>
  )
}

export default Groups
