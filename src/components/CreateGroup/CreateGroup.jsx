import {
  createGroupDocument,
  findUserByEmail,
} from "../../utils/firebase-utils"
import "./CreateGroup.scss"
import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { GroupContext } from "../../context/GroupContext"

const CreateGroup = ({ setShowAddGroup }) => {
  const [groupName, setGroupName] = useState("")
  const [members, setMembers] = useState({})
  const [addPersonCount, setAddPersonCount] = useState(1)

  const { activeUser } = useContext(UserContext)
  const { fetchGroups } = useContext(GroupContext)

  const resetGroupForm = () => {
    setGroupName("")
    setMembers({})
  }

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value)
  }

  const handleMemberEmailChange = (event, index) => {
    const { value } = event.target
    setMembers({ ...members, [index]: value })
  }

  const handleGroupCreate = async (event) => {
    event.preventDefault()
    const membersEmailArray = Object.values(members)
    let membersInfoArray = []

    try {
      if (new Set(membersEmailArray).size !== membersEmailArray.length) {
        throw new Error("Duplicate email addresses found")
      }
      await Promise.all(
        membersEmailArray.map(async (memberEmail) => {
          if (memberEmail != "") {
            const member = await findUserByEmail(memberEmail)
            if (!member || member.uid === activeUser.uid) {
              throw new Error(`User with email ${memberEmail} not found`)
            }
            membersInfoArray.push(member)
          }
        })
      )

      // Create group
      const groupId = crypto.randomUUID()
      await createGroupDocument(
        groupId,
        groupName,
        activeUser,
        ...membersInfoArray
      )
      fetchGroups()
      resetGroupForm()
      setShowAddGroup(false)
    } catch (error) {
      alert(error.message)
    }
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
          type="text"
          onChange={handleGroupNameChange}
          name="groupName"
          value={groupName}
          className="add-group-field"
          placeholder="eg. Trip to Paris"
          required
        />
        <h2 className="field-label">Group Members</h2>
        {Array.from({ length: addPersonCount }).map((_, index) => (
          <input
            key={index}
            onChange={(event) => handleMemberEmailChange(event, index)}
            name={index}
            value={members[index] || ""}
            type="email"
            placeholder="Email Address"
            className="add-member-field"
          />
        ))}
        <p
          className="add-person-btn"
          onClick={() => setAddPersonCount((prevValue) => prevValue + 1)}
        >
          +Add a person
        </p>
        <button type="submit" className="create-group-btn">
          Create
        </button>
      </form>
    </>
  )
}

export default CreateGroup
