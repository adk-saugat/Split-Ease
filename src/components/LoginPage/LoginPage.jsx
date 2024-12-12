import "./LoginPage.scss"

import { useState } from "react"
import { useNavigate } from "react-router"
import {
  googleSignIn,
  emailPasswordSignIn,
  createUserDocument,
} from "../../utils/firebase-utils"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await emailPasswordSignIn(email, password)
      console.log("done")
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleSignIn = () => {
    googleSignIn()
  }

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="email-input"
          type="username"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="password-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
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
      <button className="google-btn" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  )
}

export default LoginPage
