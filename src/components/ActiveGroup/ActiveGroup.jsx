import "./ActiveGroup.scss"
import ExpenseCard from "../ExpenseCard/ExpenseCard"
import { useContext, useEffect } from "react"
import { ExpenseContext } from "../../context/ExpenseContext"

const ActiveGroup = ({ activeGroup }) => {
  const { groupId, groupName } = activeGroup
  const { expenses, fetchGroupExpense } = useContext(ExpenseContext)

  useEffect(() => {
    fetchGroupExpense(groupId)
  }, [activeGroup])

  return (
    <div className="active-group-content">
      <div className="active-group-header">
        <h1 className="active-group-title">{groupName}</h1>
      </div>
      <div className="expense-list-container">
        {expenses &&
          expenses.map(({ expenseId }) => {
            return <ExpenseCard key={expenseId} expenseId={expenseId} />
          })}
      </div>
    </div>
  )
}

export default ActiveGroup
