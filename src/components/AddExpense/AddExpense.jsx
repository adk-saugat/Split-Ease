import { useContext, useState } from "react"
import "./AddExpense.scss"
import { GroupContext } from "../../context/GroupContext"

const defaultExpenseForm = {
  description: "",
  amount: "",
  groupInfo: "",
}

const AddExpense = ({ setTab }) => {
  const { groups } = useContext(GroupContext)
  const [expenseInfo, setExpenseInfo] = useState(defaultExpenseForm)
  const { description, amount, groupInfo } = expenseInfo

  const handleExpenseFormChange = (event) => {
    const { name, value } = event.target
    setExpenseInfo({ ...expenseInfo, [name]: value })
  }

  const handleAddExpense = (event) => {
    event.preventDefault()
    console.log("added expense")
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
          value={groupInfo}
          name="groupInfo"
          className="select-group"
          onChange={handleExpenseFormChange}
        >
          {groups.length !== 0 ? (
            groups.map(({ groupName, groupId }) => (
              <option key={groupId} value={groupId}>
                {groupName}
              </option>
            ))
          ) : (
            <option value="empty">No groups available</option>
          )}
        </select>
        <h2 className="paid-text">Paid by you and split equally.</h2>
        <button className="add-expense-btn" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export default AddExpense
