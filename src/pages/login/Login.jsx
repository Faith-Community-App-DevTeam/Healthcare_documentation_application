import { useContext, useState } from 'react';
import Topbar from '../../components/topbar/Topbar';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../../components/userContext/userContext';
import './login.css'
import fetchData from '../../components/functions/apiRequest'

export default function Login({ hasAccount }) {

    const navigate = useNavigate()

    const { user, setUser } = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    let error_message = ""



    const SignIn = () => {
        return (
            <>


                <h2 className="display-5 mb-4 login-title">Sign in and Connect With Us</h2>
                <h6 className='card-subtitle mb-3 text-danger' id="error-msg">{error_message}</h6>
                <form action="POST" onSubmit={handleSubmit}>
                    <div className="form-floating mb-4">
                        <input type="text" className="form-control form-control-lg h-25" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" placeholder='Username' />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="password" className="form-control form-control-lg h-25" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder='Password' />
                        <label htmlFor="floatingInput">Password</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg w-50" >Sign in</button>
                </form>
                <div className='mt-3'>
                    <NavLink to="/register">Don't have an account? Register for acess</NavLink>
                </div>
            </>
        )
    }

    const SignUp = () => {
        return (
            <>

                <h2 className="display-5 mb-5 login-title">Join a Community of Care</h2>
                <h6 className='card-subtitle mb-3 text-danger' id="error-msg">{error_message}</h6>
                <form action="POST" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-floating mb-4">
                                <input type="text" className="form-control form-control-lg" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" name="firstName" placeholder='First Name' required />
                                <label htmlFor="floatingInput">First Name</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-4">
                                <input type="text" className="form-control form-control-lg" value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastName" name="lastName" placeholder='Last Name' required />
                                <label htmlFor="floatingInput">Last Name</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="text" className="form-control form-control-lg" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" placeholder='Username' required />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="password" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder='Password' required />
                        <label htmlFor="floatingInput">Password</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="password" className="form-control form-control-lg" onChange={handlePasswords} id="passwordConfirm" name="passwordConfirm" placeholder='Password' required />
                        <label htmlFor="floatingInput">Confirm Password</label>
                        <div className='form-text' id="passwordConfirmText"></div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg w-50" >Register</button>
                </form>
                <div className='mt-3'>
                    <NavLink to="/login">Already have an account? Sign in</NavLink>
                </div>
            </>
        )
    }

    function handlePasswords() {
        const p1 = document.getElementById("password").value
        const p2 = document.getElementById("passwordConfirm").value
        let confirm = document.getElementById("passwordConfirmText")

        //check passwords match
        if (p2 != p1) {
            if (confirm.classList.contains("text-success")) {
                confirm.classList.remove("text-success")
            }
            confirm.classList.add("text-danger")
            confirm.innerText = "Passwords Don't Match"

        } else {
            if (confirm.classList.contains("text-danger")) {
                confirm.classList.remove("text-danger")
            }
            confirm.classList.add("text-success")
            confirm.innerText = "Passwords Match"
        }
    }
    async function handleSubmit(e) {
        e.preventDefault(); //prevents redirect


        let data = ''
        if (hasAccount) {
            data = {
                operation: "user_login",
                payload: {
                    username: username,
                    password: password,
                }
            }
        } else {
            data = {
                operation: "create_user",
                payload: {
                    username: username,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                }
            }
        }

        const res = await fetchData("POST", data)
        console.log(res)

        if (res['body']['success']) {
            console.log(res['body']['return_payload']['token']);
            setUser({
                username: username,
                token: res['body']['return_payload']['token'],
                isLoggedIn: true
            });
            //console.log(u)
            //sessionStorage.setItem("auth", JSON.stringify(u))
            navigate("/dashboard");
            //console.log(u)
            //sessionStorage.setItem("auth", JSON.stringify(u))
        } else if (res["statusCode"] === 404) {
            error_message = "Incorrect username or password"
            document.getElementById("error-msg").innerText = error_message
        } else {
            document.getElementById("error-msg").innerText = "Server error. Please try again."
        }




    }
    return (
        <>
            <Topbar page="login" />
            <div className="body-background">
                <section className="container text-center align-content-center">
                    <div className='bg-primary' style={{ height: 150 }}></div>

                    <div className="card shadow-5-strong login-box "  >
                        <div className="card-body py-5 px-md-5">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-8">

                                    <div> {hasAccount ? SignIn() : SignUp()}  </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </>
    )


}