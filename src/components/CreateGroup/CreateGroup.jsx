import { createGroupDocument, findUidByEmail } from "../../utils/firebase-utils"
import "./CreateGroup.scss"
import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"

const defaultGroupForm = {
  groupName: "",
  memberEmail: "",
}

const CreateGroup = ({ setShowAddGroup }) => {
  const [groupForm, setGroupForm] = useState(defaultGroupForm)
  const { groupName, memberEmail } = groupForm

  const { activeUser } = useContext(UserContext)
  const { uid } = activeUser

  const resetGroupForm = () => setGroupForm(defaultGroupForm)

  const handleGroupFormChange = (event) => {
    const { name, value } = event.target
    setGroupForm({ ...groupForm, [name]: value })
  }

  const handleGroupCreate = async (event) => {
    event.preventDefault()
    const memberId = await findUidByEmail(memberEmail)
    if (!memberId || memberId === uid) {
      alert("User not found")
      return
    }
    // Create Group
    const groupId = crypto.randomUUID()
    console.log(groupId)
    createGroupDocument(groupId, groupName, uid, memberId)

    resetGroupForm()
    setShowAddGroup(false)
  }

  return (
    <>
      <button className="back-arrow" onClick={() => setShowAddGroup(false)}>
        &#8592;
      </button>
      <form className="group-form" onSubmit={handleGroupCreate}>
        <h2 className="field-header">Start a new Group</h2>
        <label className="field-label">Group Name</label>
        <input
          onChange={handleGroupFormChange}
          name="groupName"
          value={groupName}
          className="add-group-field"
          placeholder="eg. Trip to Paris"
        />
        <h2 className="field-label">Add a Member</h2>
        <input
          onChange={handleGroupFormChange}
          name="memberEmail"
          value={memberEmail}
          type="email"
          placeholder="Email Address"
        />
        <button className="create-group-btn">Create</button>
      </form>
    </>
  )
}

export default CreateGroup
