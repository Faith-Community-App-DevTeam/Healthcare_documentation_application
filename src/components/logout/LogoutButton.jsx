import { useNavigate } from 'react-router-dom';
import UserContext from '../userContext/userContext';
import { useContext } from 'react';
export default function LogoutButton() {

    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)

    function handleLogout() {
        alert("You have been Logged Out, Returning to the Home page.")
        sessionStorage.removeItem("auth")
        setUser({
            ...user,
            username: null,
            token: null
        });
        navigate("/");
    }
    return (
        <>
            <button onClick={handleLogout} className="btn">Logout</button>
        </>
    )
}