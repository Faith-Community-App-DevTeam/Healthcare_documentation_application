import { useContext } from "react";
import UserContext from "../userContext/userContext";
import photo from "../../assets/LogoRed(1).png"
import "bootstrap/js/dist/collapse"
import './sidebar.css'

export default function Sidebar() {

    const user = useContext(UserContext).user;

    return (

        <>
            <div className="navbar navbar-expand-lg">
                <div className="collapse collapse-horizontal" id="collapseSidebar">
                    <div className="d-flex flex-column p-3 bg-light border-end border-2 sidebar" >
                        {/* <a href="" className="d-flex justify-content-center">
                        <img src={photo} width={"70"} height={"70"}></img>
                         <h1 className="fs-5 fw-light text-wrap">Faith Community Nursing EHR</h1> 
                    </a> */}
                        <ul className="nav nav-pills flex-column mb-auto nav-fill">
                            <li className="nav-item">
                                <a href="" className="fs-5 nav-link link-dark">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="" className="fs-5 nav-link active">
                                    Clients
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="" className="fs-5 nav-link link-dark">
                                    Forms
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="" className="fs-5 nav-link link-dark">
                                    Reports
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

