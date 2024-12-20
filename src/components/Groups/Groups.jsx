import { useState } from "react"
import "./Groups.scss"
import CreateGroup from "../CreateGroup/CreateGroup"

const Groups = () => {
  const [showAddGroup, setShowAddGroup] = useState(false)

  return (
    <div className="group-container">
      <div className="group-dashboard">
        <button className="add-group-btn" onClick={() => setShowAddGroup(true)}>
          Add Group
        </button>
        <div className="group-info">
          <h2 className="group-text">Groups</h2>
          <div className="group-list">All groups shown here!</div>
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
