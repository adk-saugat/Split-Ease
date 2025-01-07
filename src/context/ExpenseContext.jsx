import { createContext, useState } from "react"

import { getDocument } from "../utils/firebase-utils"

export const ExpenseContext = createContext({
  expenses: [],
  setExpenses: () => {},
  fetchGroupExpense: () => {},
})

const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([])

  const fetchGroupExpense = async (activeGroupId) => {
    const groupData = await getDocument("groups", activeGroupId)
    groupData.expenses && setExpenses(groupData.expenses)
  }

  const value = { expenses, setExpenses, fetchGroupExpense }

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  )
}

export default ExpenseProvider
