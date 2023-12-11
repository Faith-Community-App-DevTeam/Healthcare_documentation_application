import './topbar.css';
import { NavLink } from "react-router-dom";
import { useContext } from "react"
import UserContext from "../userContext/userContext"
import LogoutButton from '../logout/LogoutButton'
import logo from "../../assets/LogoRed(1).png"

const Topbar = (page) => {
    const user = useContext(UserContext).user;

    const viewLogin = <NavLink to="/login" className={({ isActive }) => (
        isActive ? 'btn text-primary nav-link disabled mx-3'
            : 'btn text-light  navbar-text mx-3'
    )}> Login </NavLink>

    const viewUserName = <div className=''>
        <span className=" d-inline-block align-text-top text-white me-2">{user.username}</span>
        <LogoutButton />
    </div>




    return (

        <nav className="navbar sticky-top topbar" id={"topbar-" + page.page}>
            <div className="container-fluid ">
                {page.page != "home" ?
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSidebar"><span className="navbar-toggler-icon"></span></button>
                    : <button className='btn invisible'>invisible button</button>
                    // : <NavLink to="/dashboard/clients" className={'btn nav-link text-white text-center text-wrap'} style={{ width: "6.5rem" }}><i class="bi bi-chevron-left"></i> Back to All Clients</NavLink>
                }
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