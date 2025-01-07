import { useContext, useEffect, useState } from "react"

import "./ExpenseCard.scss"
import { getDocument } from "../../utils/firebase-utils"
import { UserContext } from "../../context/UserContext"

const ExpenseCard = ({ expenseId }) => {
  const [expense, setExpense] = useState({
    amount: "",
    date: { month: "", day: "", year: "" },
    description: "",
    paidBy: "",
  })
  const [paidByUser, setPaidByUser] = useState(expense.paidBy)
  const { activeUser } = useContext(UserContext)
  const { displayName } = activeUser

  const { amount, date, description, paidBy } = expense
  const { month, day } = date

  const fetchDatabaseInfo = async () => {
    if (expenseId) {
      const expenseRef = await getDocument("expenses", expenseId)
      setExpense(expenseRef)

      if (expenseRef.paidBy) {
        const userRef = await getDocument("users", expenseRef.paidBy)
        setPaidByUser(userRef.displayName)
      }
    }
  }

  useEffect(() => {
    fetchDatabaseInfo()
  }, [expenseId])

  return (
    <div className="expense-card-container">
      <div className="date-container">
        <div className="month">{month}</div>
        <div className="day">{day < 10 ? `0${day}` : day}</div>
      </div>
      <div className="desc-amt-container">
        <h2 className="description">{description}</h2>
        <p className="amount">
          {paidByUser === displayName ? "You" : paidByUser} paid ${amount}
        </p>
      </div>
      <div className="paid-container">
        <div className="lent-container">
          {displayName === paidByUser ? (
            <span className="lent">You lent</span>
          ) : (
            <span className="owe">You owe</span>
          )}
        </div>
        <div className="lent-amt-container">
          {displayName === paidByUser ? (
            <span className="lent-amt">
              ${(Number(amount) * (2 / 3)).toFixed(2)}
            </span>
          ) : (
            <span className="owe-amt">
              ${(Number(amount) * (1 / 3)).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExpenseCard
