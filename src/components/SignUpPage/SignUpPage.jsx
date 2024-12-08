import "./SignUpPage.scss"
import { useNavigate } from "react-router"

const SignUpPage = () => {
  const navigate = useNavigate()
  return (
    <div className="signup-container">
      <h2 className="signup-header">Sign Up</h2>
      <form className="signup-form">
        <input
          className="email-input"
          type="text"
          placeholder="Display Name"
          required
        />
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
        <button className="signup-btn">Login</button>
        <div className="signup-Header">
          Already have an Account?
          <a onClick={() => navigate("/login")} className="login-link">
            Login
          </a>
        </div>
      </form>
      <div className="or">or</div>
      <button className="google-btn">Sign in with Google</button>
    </div>
  )
}

export default SignUpPage
