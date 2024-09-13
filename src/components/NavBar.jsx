import { NavLink, useNavigate } from "react-router-dom"
import "./NavBar.css"

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
                        <button className="underline text-blue-600 hover:text-purple-700"
                            onClick={() => {
                                localStorage.removeItem("shark_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> : ""
            }
        </ul>
    )
}