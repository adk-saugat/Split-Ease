import { googleSignIn } from "../../utils/firebase-utils"
import "./SignUpPage.scss"
import { useNavigate } from "react-router"

const SignUpPage = () => {
  const navigate = useNavigate()

  const handleGoogleSignIn = () => {
    googleSignIn()
  }
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
        <input
          className="password-input"
          type="password"
          placeholder="Confirm Password"
          required
        />
        <button className="signup-btn">Sign Up</button>
        <div className="signup-Header">
          Already have an Account?
          <a onClick={() => navigate("/login")} className="login-link">
            Login
          </a>
        </div>
      </form>
      <div className="or">or</div>
      <button className="google-btn" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  )
}

export default SignUpPage
