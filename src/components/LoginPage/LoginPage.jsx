import "./LoginPage.scss"

import { useState } from "react"
import { useNavigate } from "react-router"
import {
  googleSignIn,
  emailPasswordSignIn,
  createUserDocument,
} from "../../utils/firebase-utils"

const LoginPage = () => {
  const [userEmail, setEmail] = useState("")
  const [userPassword, setPassword] = useState("")
  const navigate = useNavigate()

  const resetForm = () => {
    setEmail("")
    setPassword("")
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await emailPasswordSignIn(userEmail, userPassword)
      resetForm()
      navigate("/dashboard")
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("User doesnot exist or Wrong Username/Password!")
      }
    }
  }

  const handleGoogleSignIn = async () => {
    const { user } = await googleSignIn()
    const { email, uid } = user
    createUserDocument(email, uid)
    navigate("/dashboard")
  }

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="email-input"
          type="username"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="password-input"
          type="password"
          placeholder="Password"
          value={userPassword}
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
