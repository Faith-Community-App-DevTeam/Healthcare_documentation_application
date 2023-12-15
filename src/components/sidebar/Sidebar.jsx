import { useContext } from "react";
import UserContext from "../userContext/userContext";
import photo from "../../assets/LogoRed(1).png"
import "bootstrap/js/dist/collapse"
import './sidebar.css'
import { NavLink } from "react-router-dom";

export default function Sidebar() {

    const user = useContext(UserContext).user;

    return (

        <>
            <div className="navbar sticky-top navbar-expand-lg ">
                <div className="collapse collapse-horizontal show" id="collapseSidebar">
                    <div className="d-flex flex-column p-1 sidebar pt-3" >
                        <a href="/" className="d-flex justify-content-center">
                            <img src={photo} width={"80"} height={"80"} alt="logo"></img>
                        </a>
                        <hr />
                        <div className="">
                            <ul className="nav nav-pills flex-column mb-auto nav-fill">
                                <li className="nav-item">
                                    <NavLink to='/dashboard/home' className="nav-link fs-5">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/dashboard/patients' className="nav-link fs-5">Patients</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/dashboard/forms' className="nav-link fs-5">Forms</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/dashboard/reports' className="nav-link fs-5">Reports</NavLink>
                                </li>


                                {user.role === "admin" && user.isLoggedIn ? <li className="nav-item">
                                    <NavLink to='/dashboard/admin' className="nav-link fs-5">Admin Panel</NavLink>
                                </li> : ""}
                            </ul>
                        </div>



                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

