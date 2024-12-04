import { Route, Routes } from "react-router-dom"
import "./App.scss"
import LandingPage from "./routes/LandingPage/LandingPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}

export default App
