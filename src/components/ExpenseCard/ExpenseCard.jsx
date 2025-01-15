import { useContext, useEffect, useState } from "react"

import "./ExpenseCard.scss"
import { getDocument } from "../../utils/firebase-utils"
import { UserContext } from "../../context/UserContext"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

const ExpenseCard = ({ expenseId }) => {
  const [expense, setExpense] = useState({
    amount: "",
    date: { month: "", day: "", year: "" },
    description: "",
    paidBy: "",
  })
  const [paidByUser, setPaidByUser] = useState(expense.paidBy)
  const [showExpenseMenu, setShowExpenseMenu] = useState(false)
  const [splitBetweenUsers, setSplitBetweenUsers] = useState([])

  const { activeUser } = useContext(UserContext)
  const { displayName } = activeUser

  const { amount, date, description, paidBy, splitBetween } = expense
  const { month, day, year } = date

  const memberNum = splitBetween?.length

  const fetchDatabaseInfo = async () => {
    if (expenseId) {
      const expenseRef = await getDocument("expenses", expenseId)
      setExpense(expenseRef)

      if (expenseRef.paidBy) {
        const userRef = await getDocument("users", expenseRef.paidBy)
        setPaidByUser(userRef.displayName)
      }
      let userArray = []

      expenseRef?.splitBetween?.map(async (userId) => {
        const userRef = await getDocument("users", userId)
        userArray.push({ displayName: userRef.displayName, uid: userId })
      })
      setSplitBetweenUsers(userArray)
    }
  }

  useEffect(() => {
    fetchDatabaseInfo()
  }, [expenseId])

  console.log(splitBetweenUsers)

  return (
    <div
      className="expense-card-container"
      onClick={() => {
        setShowExpenseMenu(true)
      }}
    >
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
              $
              {(
                Number(amount) *
                (Number(memberNum - 1) / Number(memberNum))
              ).toFixed(2)}
            </span>
          ) : (
            <span className="owe-amt">
              ${(Number(amount) * (1 / Number(memberNum))).toFixed(2)}
            </span>
          )}
        </div>
      </div>
      {showExpenseMenu && (
        <div className="expense-menu-container">
          <div className="expense-box">
            <div className="expense-nav">
              <ArrowBackIcon
                onClick={(e) => {
                  e.stopPropagation()
                  setShowExpenseMenu(false)
                }}
              />
              <span>
                <DeleteIcon className="expense-delete-icon" />
                <EditIcon />
              </span>
            </div>
            <div className="expense-body">
              <div className="exp-body-header">
                <h2 className="exp-desc">{description}</h2>
                <p className="exp-amount">${amount}</p>
                <p className="exp-paidBy">
                  Added by {paidByUser} on {month} {day}, {year}
                </p>
              </div>
              <div className="exp-body-paidBy">
                <div>
                  {paidByUser} paid ${amount}.
                </div>
                {splitBetweenUsers.map(({ displayName, uid }) => {
                  return (
                    <div className="expense-user-owe" key={uid}>
                      <span className="arrow">&#11169;</span> {displayName} owes
                      ${(Number(amount) / memberNum).toFixed(2)}.
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExpenseCard
