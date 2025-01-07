import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"

import { BrowserRouter } from "react-router-dom"
import UserProvider from "./context/UserContext.jsx"
import GroupsProvider from "./context/GroupContext.jsx"
import ExpenseProvider from "./context/ExpenseContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <GroupsProvider>
          <ExpenseProvider>
            <App />
          </ExpenseProvider>
        </GroupsProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
