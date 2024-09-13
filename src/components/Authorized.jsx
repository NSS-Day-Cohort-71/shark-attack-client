import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./NavBar.jsx"

export const Authorized = () => {
  if (localStorage.getItem("shark_token")) {
    return <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/login' replace />
}
