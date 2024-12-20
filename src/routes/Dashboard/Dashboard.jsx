import { Link, useNavigate } from "react-router-dom"
import "./Dashboard.scss"
import { signOutUser } from "../../utils/firebase-utils"
import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"
import Groups from "../../components/Groups/Groups"
import AddExpense from "../../components/AddExpense/AddExpense"
import Friends from "../../components/Friends/Friends"

const Dashboard = () => {
  const [tab, setTab] = useState("groups")

  const navigate = useNavigate()
  const handleSignOut = async () => {
    try {
      await signOutUser()
      navigate("/")
    } catch (error) {
      console.log(error.code)
    }
  }

  const { activeUser } = useContext(UserContext)
  const { displayName } = activeUser

  return (
    <div className="dash-container">
      <header className="dash-header">
        <h2 className="welcome-text">Welcome, {displayName}!</h2>
        <button className="sign-out-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </header>
      <nav className="dash-nav">
        <button
          className={`dash-nav-btn ${tab === "groups" && "active"}`}
          onClick={() => setTab("groups")}
        >
          Groups
        </button>
        <button
          className={`dash-nav-btn ${tab === "expense" && "active"}`}
          onClick={() => setTab("expense")}
        >
          Add Expense
        </button>
        <button
          className={`dash-nav-btn friends-nav ${
            tab === "friends" && "active"
          }`}
          onClick={() => setTab("friends")}
        >
          Friends
        </button>
      </nav>
      <section className="transactions">
        <div>{tab === "groups" && <Groups />}</div>
        <div>{tab === "expense" && <AddExpense />}</div>
        <div>{tab === "friends" && <Friends />}</div>
      </section>
    </div>
  )
}

export default Dashboard
