import { useState, useEffect, useContext } from "react"
import "./Groups.scss"
import CreateGroup from "../CreateGroup/CreateGroup"
import { GroupContext } from "../../context/GroupContext"

const Groups = () => {
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [activeGroup, setActiveGroup] = useState(null)
  const { groups } = useContext(GroupContext)

  const handleShowGroup = (groupId) => {
    setActiveGroup(groupId)
  }

  return (
    <div className="group-container">
      <div className="group-dashboard">
        <button className="add-group-btn" onClick={() => setShowAddGroup(true)}>
          Add Group
        </button>
        <div className="group-info">
          <h2 className="group-text">Groups</h2>
          <div className="group-list">
            {groups.map(({ groupId, groupName }) => {
              return (
                <div key={groupId}>
                  <button
                    className="group-name-btn"
                    onClick={() => {
                      setShowAddGroup(false)
                      handleShowGroup(groupName)
                    }}
                  >
                    &#9750; {groupName}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {showAddGroup ? (
        <div className="group-content">
          <CreateGroup setShowAddGroup={setShowAddGroup} />
        </div>
      ) : (
        <div className="group-content">
          {activeGroup !== null ? activeGroup : "Group Content!"}
        </div>
      )}
    </div>
  )
}

export default Groups
