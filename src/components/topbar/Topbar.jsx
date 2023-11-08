import './topbar.css';
import { NavLink } from "react-router-dom";
import { useContext } from "react"
import UserContext from "../userContext/userContext"

const Topbar = () => {
    const viewLogin = <NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-link disabled' : 'navbar-text d-flex mx-3')}> Login </NavLink>

    const user = useContext(UserContext).user;
    const viewUserName = <span className=" navbar-brand text-white text-uppercase">{user.username}</span>

    return (
        <nav className="navbar sticky-top bg-primary bg-opacity-75">
            <div className="container-fluid">
                <span className="navbar-brand text-white">Faith Community Nursing EHR</span>
                {user.username != null && user.is_authenticate ? viewUserName : viewLogin}
            </div>


        </nav >
    )
}

export default Topbar