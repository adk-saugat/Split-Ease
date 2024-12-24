import { useContext, useState } from "react"
import {
  emailPasswordSignUp,
  googleSignIn,
  createUserDocument,
  auth,
} from "../../utils/firebase-utils"
import "./SignUpPage.scss"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { updateProfile } from "firebase/auth"

const defaultFormField = {
  userName: "",
  userEmail: "",
  userPassword: "",
  confirmPassword: "",
}

const SignUpPage = () => {
  const [field, setField] = useState(defaultFormField)
  const { userName, userEmail, userPassword, confirmPassword } = field
  const navigate = useNavigate()

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setField({ ...field, [name]: value })
  }

  const resetForm = () => {
    setField(defaultFormField)
  }

  const { setActiveUser } = useContext(UserContext)

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    if (userPassword !== confirmPassword) {
      alert("passwords doesnot match!")
      return
    }

    try {
      const { user } = await emailPasswordSignUp(userEmail, userPassword)
      await updateProfile(auth.currentUser, { displayName: userName })
      setActiveUser({ displayName: userName, email: userEmail, uid: user.uid })
      const { displayName, email, uid } = user
      resetForm()
      createUserDocument(uid, displayName, email)
      navigate("/dashboard")
    } catch (error) {
      console.log(error.code)
    }
  }

  const handleGoogleSignIn = async () => {
    const { user } = await googleSignIn()
    const { email, uid, displayName } = user
    createUserDocument(uid, displayName, email)
    navigate("/dashboard")
  }

  return (
    <div className="signup-container">
      <h2 className="signup-header">Sign Up</h2>
      <form className="signup-form" onSubmit={handleFormSubmit}>
        <input
          className="email-input"
          type="text"
          placeholder="Display Name"
          name="userName"
          value={userName}
          onChange={handleFormChange}
          required
        />
        <input
          className="email-input"
          type="username"
          placeholder="Email"
          name="userEmail"
          value={userEmail}
          onChange={handleFormChange}
          required
        />
        <input
          className="password-input"
          type="password"
          placeholder="Password"
          name="userPassword"
          value={userPassword}
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
