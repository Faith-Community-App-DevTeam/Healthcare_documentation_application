import { useContext } from "react";
import UserContext from "../userContext/userContext";
import photo from "../../assets/LogoRed(1).png"
import "bootstrap/js/dist/collapse"

export default function Sidebar() {

    const user = useContext(UserContext).user;

    return (

        <>

            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light border-end border-2 col-sm-1" style={{ height: "calc(100vh - 60px)" }}>
                <button className="btn btn-primary mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSidebar">Menu</button>
                <div className="collapse collapse-horizontal" id="collapseSidebar">
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
                </div>
            </div >
        </>
    )
}

