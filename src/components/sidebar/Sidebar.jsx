import { useContext } from "react";
import UserContext from "../userContext/userContext";
import photo from "../../assets/LogoRed(1).png"

export default function Sidebar() {

    const user = useContext(UserContext).user;

    return (

        <>

            <div class="d-flex flex-column flex-shrink-0 p-3 bg-light sticky-left" style={{ width: 200, height: "100%" }}>
                <a href="" class="d-flex justify-content-center">
                    <img src={photo} width={"70"} height={"70"}></img>
                    {/* <h1 class="fs-5 fw-light text-wrap">Faith Community Nursing EHR</h1> */}
                </a>
                <hr />
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        <a href="" class="nav-link link-dark">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="" class="nav-link active">
                            Clients
                        </a>
                    </li>
                    <li>
                        <a href="" class="nav-link link-dark">
                            Forms
                        </a>
                    </li>
                    <li>
                        <a href="" class="nav-link link-dark">
                            Reports
                        </a>
                    </li>
                </ul>
                <hr />
                <div class="dropdown">
                    <a href="" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
                        <strong>{user.username}</strong>
                    </a>
                    <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

