import './topbar.css';
import { Link } from "react-router-dom";

const Topbar = () => {
    return (
        <header className="topbar-sticky">
            <nav className="topbar">
                <div className="topbar-logo">
                    <span className="logo">Alaska Faith Community Nurse Rescource Center</span>
                </div>
                <div class="topbar-loginlink">
                    <Link to="login"> Login </Link>
                </div>

            </nav>
        </header>
    )
}

export default Topbar