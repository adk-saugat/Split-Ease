import { useContext, useState } from "react"
import "./AddExpense.scss"
import { GroupContext } from "../../context/GroupContext"
import { UserContext } from "../../context/UserContext"
import {
  createExpenseDocument,
  getCollectionData,
} from "../../utils/firebase-utils"

const defaultExpenseForm = {
  description: "",
  amount: "",
  splitBetween: [],
}

const AddExpense = ({ setTab }) => {
  const [expenseInfo, setExpenseInfo] = useState(defaultExpenseForm)
  const [IdGroup, setIdGroup] = useState("")
  const [groupMembers, setGroupMembers] = useState([])
  const [splitMembers, setSplitMembers] = useState({})

  const { description, amount } = expenseInfo

  const { groups } = useContext(GroupContext)
  const { activeUser } = useContext(UserContext)

  const handleExpenseFormChange = (event) => {
    const { name, value } = event.target
    setExpenseInfo({ ...expenseInfo, [name]: value })
  }

  const handleSelectFormChange = async (event) => {
    setIdGroup(event.target.value)
    const allGroups = await getCollectionData("groups")
    const group = allGroups.find(
      (group) => group.groupId === event.target.value
    )
    setGroupMembers(group.members)
  }

  const handleCheckBoxChange = (event) => {
    const { name } = event.target
    setSplitMembers({ ...splitMembers, [name]: !splitMembers[name] })
  }
  // console.log(splitMembers)

  const handleAddExpense = async (event) => {
    event.preventDefault()

    const splitBetween = Object.keys(splitMembers).map((member) => {
      if (splitMembers[member]) {
        return member
      }
    })

    // Add expense to group
    const expenseId = crypto.randomUUID()
    const now = new Date()
    const date = {
      day: now.getDate(),
      month: now.toLocaleString("default", { month: "short" }),
      year: now.getFullYear(),
    }

    const newExpense = {
      expenseId,
      groupId: IdGroup,
      amount,
      description,
      paidBy: activeUser.uid,
      splitBetween,
      date,
    }
    await createExpenseDocument(newExpense)

    setTab("groups")
  }

  return (
    <div className="add-expense-container">
      <form className="add-expense-form" onSubmit={handleAddExpense}>
        <label className="desc-label">Enter a description</label>
        <input
          className="desc-field"
          type="text"
          placeholder="eg. Groceries"
          name="description"
          value={description}
          onChange={handleExpenseFormChange}
          required
        />
        <label className="expense-label">Enter expense</label>
        <input
          className="expense-field"
          type="number"
          name="amount"
          value={amount}
          onChange={handleExpenseFormChange}
          placeholder="$0.00"
          required
        />
        <label className="select-label">Select Group</label>
        <select
          value={IdGroup}
          name="groupInfo"
          className="select-group"
          onChange={handleSelectFormChange}
          required
        >
          {IdGroup === "" && <option value="">Select a group</option>}
          {groups.length !== 0 ? (
            groups.map(({ groupName, groupId }, index) => (
              <option key={groupId} value={groupId}>
                {groupName}
              </option>
            ))
          ) : (
            <option value="empty">No groups available</option>
          )}
        </select>
        {groupMembers.length !== 0 && (
          <div>
            <label className="split-label">Split between:</label>
            <div className="split-container">
              {groupMembers.map((member, index) => (
                <div key={index} className="split-member">
                  <input
                    type="checkbox"
                    className="split-checkbox"
                    name={member.uid}
                    checked={splitMembers[index]}
                    onChange={(event) => handleCheckBoxChange(event)}
                  />
                  <label>{member.displayName}</label>
                </div>
              ))}
            </div>
          </div>
        )}
        <h2 className="paid-text">Paid by you and split equally.</h2>
        <button className="add-expense-btn" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default AddExpense
