import { useState } from 'react';
import Topbar from '../../components/topbar/Topbar';
import './login.css'

export default function Login() {
    // test data for users
    const users = {
        user1: {
            username: "Admin",
            password: "passtest",
            network: "testNetwork",
            clientList: "??????",
        },
        user2: {
            username: "Tester",
            password: "testpass",
            network: "",
            clientList: "??????",
        }

    }

    // check if user logged in successfully/ is authenticated
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(sessionStorage.setItem("authenticated", false));

    // once the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault(); //prevents redirect
        console.log(username + " " + password);
        console.log(users.user1.username + " " + users.user1.password);

        if (username === users.user1.username && password === users.user1.password) {
            setAuthenticated(true);
            sessionStorage.setItem("authenticated", true);
            console.log("works", authenticated);
        }

    }

    // need to fix the login link in the topbar, goes to /login/login
    return (
        <>
            <Topbar />
            <div className="login-right-side">
                <h1 className="login-title">Join a Community of Care</h1>
                <h1 className="login-title">Log In and Connect with Us</h1>
            </div>
            <div className="login-box">
                <form className="login-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Login</legend>
                        <div className="col-12">
                            <label htmlFor="username" >Username:</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" type="text"></input>
                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="username" type="password"></input>
                        </div>
                        <button className="login-button">Log In</button>
                    </fieldset>
                </form>
            </div>

        </>
    )
}