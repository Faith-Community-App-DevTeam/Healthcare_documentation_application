import './topbar.css';
import { NavLink } from "react-router-dom";

const Topbar = () => {
    return (
        <nav className="navbar sticky-top bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand text-white">Alaska Faith Community Nurse Rescource Center</span>
                <NavLink to="/login"
                    className={({ isActive }) => (isActive ? 'nav-link disabled' : 'navbar-text d-flex')}> Login </NavLink>
            </div>


        </nav >
    )
}

export default Topbar