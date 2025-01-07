import { useEffect, useState } from "react"
import "./ExpenseCard.scss"
import { getDocument } from "../../utils/firebase-utils"

const ExpenseCard = ({ expenseId }) => {
  const [expense, setExpense] = useState({
    amount: "",
    date: { month: "", day: "", year: "" },
    description: "",
    paidBy: "",
  })
  const { amount, date, description, paidBy } = expense
  const { month, day } = date

  const fetchDatabaseInfo = async () => {
    const expenseRef = await getDocument("expenses", expenseId)
    setExpense(expenseRef)
  }

  useEffect(() => {
    fetchDatabaseInfo()
  }, [])
  console.log(expense)

  return (
    <div className="expense-card-container">
      <div className="date-container">
        <div className="month">{month}</div>
        <div className="day">{day < 10 ? `0${day}` : day}</div>
      </div>
      <div className="desc-amt-container">
        <h2 className="description">{description}</h2>
        <p className="amount">Saugat paid ${amount}</p>
      </div>
      <div className="paid-container">
        <div className="lent">You lent</div>
        <div className="lent-amt">$5.89</div>
      </div>
    </div>
  )
}

export default ExpenseCard
