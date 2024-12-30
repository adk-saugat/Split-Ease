import { useState, useEffect, useContext } from "react"
import "./Groups.scss"
import CreateGroup from "../CreateGroup/CreateGroup"
import { GroupContext } from "../../context/GroupContext"

const Groups = () => {
  const [showAddGroup, setShowAddGroup] = useState(false)
  const { groups } = useContext(GroupContext)

  console.log(groups)
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
              return <p key={groupId}>{groupName}</p>
            })}
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
