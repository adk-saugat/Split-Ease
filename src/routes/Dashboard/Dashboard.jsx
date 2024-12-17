import { Link, useNavigate } from "react-router-dom"
import "./Dashboard.scss"
import { signOutUser } from "../../utils/firebase-utils"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

const Dashboard = () => {
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
        <button className="dash-nav-btn">Groups</button>
        <button className="dash-nav-btn">Add Expense</button>
        <button className="dash-nav-btn friends-nav">Friends</button>
      </nav>
      <section>transactions</section>
    </div>
  )
}

export default Dashboard
