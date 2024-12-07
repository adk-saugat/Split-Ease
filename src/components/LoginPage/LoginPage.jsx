import "./LoginPage.scss"

const LoginPage = () => {
  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form className="login-form">
        <label className="email-label">Email</label>
        <input
          className="email-input"
          type="username"
          placeholder="Email"
          required
        />
        <label className="password-label">Password</label>
        <input
          className="password-input"
          type="password"
          placeholder="Password"
          required
        />
        <button className="login-btn">Login</button>
        <div className="signup-Header">
          Don't have an account?
          <a className="signup-link">Sign In</a>
        </div>
      </form>
      <div className="or">or</div>
      <button className="google-btn">Sign in with google</button>
    </div>
  )
}

export default LoginPage
