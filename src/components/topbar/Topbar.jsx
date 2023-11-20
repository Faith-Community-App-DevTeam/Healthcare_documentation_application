import './topbar.css';
import { NavLink } from "react-router-dom";
import { useContext } from "react"
import UserContext from "../userContext/userContext"
import LogoutButton from '../logout/LogoutButton'
import logo from "../../assets/LogoRed(1).png"

const Topbar = (page) => {
    const viewLogin = <NavLink to="/login" className={({ isActive }) => (isActive ? 'btn text-primary nav-link disabled mx-3' : 'btn text-light  navbar-text mx-3')}> Login </NavLink>

    const user = useContext(UserContext).user;
    const viewUserName = <div className=''>
        <span className=" d-inline-block align-text-top text-white me-2">{user.username}</span>
        <LogoutButton />
    </div>



    return (

        <nav className="navbar sticky-top topbar" id={"topbar-" + page.page}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSidebar"><i class="bi bi-list text-white"></i></button>
                <div className="navbar-brand">
                    <img src={logo} alt="Logo" width="42" height="36" className=" d-inline-block align-text-top me-2" />
                    <span className="d-none d-md-inline-block">Faith Community Nursing EHR</span>
                    <span className='d-inline-block d-md-none'>FCN EHR</span>
                </div>
                {user.username != null && user.isLoggedIn ? viewUserName : viewLogin}


            </div>


        </nav >
    )
}

export default Topbar