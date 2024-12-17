import { Link } from "react-router"
import "./Home.scss"

const Home = () => {
  return (
    <div className="login-signup-container">
      <h2 className="welcome-text">Welcome to Split-Ease!</h2>
      <div className="inner-container">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <h2 className="or-word">Or</h2>
        <Link to="/sign-up">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  )
}

export default Home
