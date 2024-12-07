import "./LoginPage.scss"
import { useNavigate } from "react-router"

const LoginPage = () => {
  const navigate = useNavigate()
  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form className="login-form">
        <input
          className="email-input"
          type="username"
          placeholder="Email"
          required
        />
        <input
          className="password-input"
          type="password"
          placeholder="Password"
          required
        />
        <button className="login-btn">Login</button>
        <div className="signup-Header">
          Don't have an account?
          <a onClick={() => navigate("/sign-up")} className="signup-link">
            Sign Up
          </a>
        </div>
      </form>
      <div className="or">or</div>
      <button className="google-btn">Sign in with Google</button>
    </div>
  )
}

export default LoginPage
