import { NavLink, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { Button } from "@radix-ui/themes"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <NavLink to={"/products"}>View Products</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink to={"/cart"}>Cart</NavLink>
            </li>
            {
                (localStorage.getItem("shark_token") !== null) ?
                    <li className="navbar__item lastitem">
                        <Button color="cyan" onClick={() => {
                            localStorage.removeItem("shark_token")
                            navigate('/login')
                        }}>
                            Logout
                        </Button>
                    </li> : ""
            }
        </ul>
    )
}