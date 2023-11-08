import { useContext } from "react";
import UserContext from "../userContext/userContext";
import photo from "../../assets/LogoRed(1).png"

export default function Sidebar() {

    const user = useContext(UserContext).user;

    return (

        <>

            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light border-end border-2" style={{ width: "15vw", height: "calc(100vh - 60px)" }}>
                <a href="" className="d-flex justify-content-center">
                    <img src={photo} width={"70"} height={"70"}></img>
                    {/* <h1 className="fs-5 fw-light text-wrap">Faith Community Nursing EHR</h1> */}
                </a>
                <hr />
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
                <hr />
                <div className="dropdown">
                    <a href="" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong>{user.username}</strong>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div >
        </>
    )
}

