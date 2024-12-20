import { useState } from "react"
import "./Groups.scss"

const Groups = () => {
  const [showAddGroup, setShowAddGroup] = useState(false)

  const handleGroupCreate = (event) => {
    event.preventDefault()
  }

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
          <button className="back-arrow" onClick={() => setShowAddGroup(false)}>
            &#8592;
          </button>
          <form>
            <label className="field-label">Start a new Group</label>
            <input
              className="add-group-field"
              placeholder="eg. Trip to Paris"
            />
            <button className="create-group-btn" onClick={handleGroupCreate}>
              Create
            </button>
          </form>
        </div>
      ) : (
        <div className="group-content">All group contents here!</div>
      )}
    </div>
  )
}

export default Groups
