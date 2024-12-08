import { Link } from "react-router"
import "./Home.scss"

const Home = () => {
  return (
    <div className="login-signup-container">
      <h2 className="welcome-text">Welcome to Split-Ease!</h2>
      <Link to="/login">
        <button className="login-btn">Login</button>
      </Link>
      <Link to="/sign-up">
        <button className="signuo-btn">Sign Up</button>
      </Link>
    </div>
  )
}

export default Home
