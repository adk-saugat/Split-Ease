import { useState } from "react"
import { emailPasswordSignUp, googleSignIn } from "../../utils/firebase-utils"
import "./SignUpPage.scss"
import { useNavigate } from "react-router"

const defaultFormField = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpPage = () => {
  const [field, setField] = useState(defaultFormField)
  const { name, email, password, confirmPassword } = field

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setField({ ...field, [name]: value })
  }

  const resetForm = () => {
    setField(defaultFormField)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert("passwords doesnot match!")
      return
    }

    try {
      const response = await emailPasswordSignUp(email, password)
      resetForm()
    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate()

  const handleGoogleSignIn = () => {
    googleSignIn()
  }

  return (
    <div className="signup-container">
      <h2 className="signup-header">Sign Up</h2>
      <form className="signup-form" onSubmit={handleFormSubmit}>
        <input
          className="email-input"
          type="text"
          placeholder="Display Name"
          name="name"
          value={name}
          onChange={handleFormChange}
          required
        />
        <input
          className="email-input"
          type="username"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleFormChange}
          required
        />
        <input
          className="password-input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleFormChange}
          required
        />
        <input
          className="password-input"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleFormChange}
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
