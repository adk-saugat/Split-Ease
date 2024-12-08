import "./Navigation.scss"

import Header from "../../components/Header/Header"
import { Outlet } from "react-router"

const Navigation = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Navigation
