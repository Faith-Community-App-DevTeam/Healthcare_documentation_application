import { useNavigate } from 'react-router-dom';
import UserContext from '../userContext/userContext';
import { useContext } from 'react';
export default function LogoutButton() {

    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)

    function handleLogout() {
        alert("You have been Logged Out, Returning to the Home page.")
        // sessionStorage.removeItem("auth")
        // setUser({
        //     ...user,
        //     username: null,
        //     token: null,
        //     isLoggedIn: false
        // });
        // navigate("/");
    }
    return (
        <>
            <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#logoutbtn">Logout</button>
            <div className="modal fade" id="logoutbtn" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Logout</h5>

                        </div>
                        <div className="modal-body">
                            <h1>You've been logged out, Returning to the home page</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}