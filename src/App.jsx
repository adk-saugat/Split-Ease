import { Route, Routes } from "react-router-dom"
import "./App.scss"
import LoginPage from "./components/LoginPage/LoginPage"
import SignUpPage from "./components/SignUpPage/SignUpPage"
import Navigation from "./routes/Navigation/Navigation"
import Home from "./routes/Home/Home"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  )
}

export default App
