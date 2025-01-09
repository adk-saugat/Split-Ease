import "./ActiveGroup.scss"
import ExpenseCard from "../ExpenseCard/ExpenseCard"
import { useContext, useEffect, useState } from "react"
import { ExpenseContext } from "../../context/ExpenseContext"
import DeleteIcon from "@mui/icons-material/Delete"

const ActiveGroup = ({ activeGroup }) => {
  const [showDeleteMenu, setShowDeleteMenu] = useState(false)
  const { groupId, groupName } = activeGroup
  const { expenses, fetchGroupExpense } = useContext(ExpenseContext)

  useEffect(() => {
    fetchGroupExpense(groupId)
  }, [activeGroup])
  console.log(showDeleteMenu)
  return (
    <div className="active-group-content">
      <div className="active-group-header">
        <h1 className="active-group-title">{groupName}</h1>
        <DeleteIcon
          className="delete-btn"
          onClick={() => setShowDeleteMenu(true)}
        />
      </div>
      <div className="expense-list-container">
        {expenses &&
          expenses.map(({ expenseId }) => {
            return <ExpenseCard key={expenseId} expenseId={expenseId} />
          })}
      </div>
      {showDeleteMenu && (
        <div className="delete-menu-container">
          <div className="delete-box">
            <h2 className="delete-text">Do you want to delete this Group?</h2>
            <div className="delete-buttons-container">
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteMenu(false)}
              >
                Cancel
              </button>
              <button className="delete-btn-yes">Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActiveGroup
