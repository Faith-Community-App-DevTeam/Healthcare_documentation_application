import './topbar.css';
import { NavLink } from "react-router-dom";
import { useContext } from "react"
import UserContext from "../userContext/userContext"
import LogoutButton from '../logout/LogoutButton';

const Topbar = () => {
    const viewLogin = <NavLink to="/login" className={({ isActive }) => (isActive ? 'btn text-white nav-link disabled mx-3' : 'btn navbar-text d-flex mx-3')}> Login </NavLink>

    const user = useContext(UserContext).user;
    const viewUserName = <div className=''>
        <span className=" col-11 navbar-brand text-white">{user.username}</span>
        <LogoutButton />
    </div>



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