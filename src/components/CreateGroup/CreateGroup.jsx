import "./CreateGroup.scss"
import { useState } from "react"

const defaultGroupForm = {
  groupName: "",
  memberEmail: "",
}

const CreateGroup = ({ setShowAddGroup }) => {
  const [groupForm, setGroupForm] = useState(defaultGroupForm)

  const handleGroupCreate = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <button className="back-arrow" onClick={() => setShowAddGroup(false)}>
        &#8592;
      </button>
      <form className="group-form" onSubmit={handleGroupCreate}>
        <h2 className="field-header">Start a new Group</h2>
        <label className="field-label">Group Name</label>
        <input className="add-group-field" placeholder="eg. Trip to Paris" />
        <h2 className="field-label">Add a Member</h2>
        <input type="email" placeholder="Email Address" />
        <button className="create-group-btn">Create</button>
      </form>
    </>
  )
}

export default CreateGroup
