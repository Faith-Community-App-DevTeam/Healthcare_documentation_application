import { useContext, useState } from 'react';
import Topbar from '../../components/topbar/Topbar';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../components/userContext/userContext';
//import './login.css'
import fetchData from '../../components/functions/apiRequest'

export default function Login({ hasAccount }) {

    const navigate = useNavigate()

    const { user, setUser } = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const SignIn = () => {
        return (
            <>

                <div className="card mx-4 mx-md-5 shadow-5-strong" style={{ marginTop: -100, background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(30px)" }}>
                    <div className="card-body py-5 px-md-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h2 className="fw-bold mb-5">Sign in and Connect With Us</h2>
                                <form action="POST" onSubmit={handleSubmit}>
                                    <div className="form-floating mb-4">
                                        <input type="text" className="form-control form-control-lg" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" placeholder='Username' />
                                        <label htmlFor="floatingInput">Username</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input type="password" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder='Password' />
                                        <label htmlFor="floatingInput">Password</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg w-50" >Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const SignUp = () => {
        return (
            <div className="card mx-4 mx-md-5 shadow-5-strong" style={{ marginTop: -100, background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(30px)" }}>
                <div className="card-body py-5 px-md-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-9">
                            <h2 className="fw-bold mb-5">Join a Community of Care</h2>
                            <form action="POST" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-4">
                                            <input type="text" className="form-control form-control-lg" value={firstName} onChange={(e) => setFirstName(e.target.value)} id="firstName" name="firstName" placeholder='First Name' />
                                            <label htmlFor="floatingInput">First Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-4">
                                            <input type="text" className="form-control form-control-lg" value={lastName} onChange={(e) => setLastName(e.target.value)} id="lastName" name="lastName" placeholder='Last Name' />
                                            <label htmlFor="floatingInput">Last Name</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating mb-4">
                                    <input type="text" className="form-control form-control-lg" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" placeholder='Username' />
                                    <label htmlFor="floatingInput">Username</label>
                                </div>
                                <div className="form-floating mb-4">
                                    <input type="password" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder='Password' />
                                    <label htmlFor="floatingInput">Password</label>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg w-50" >Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
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
        }




    }
    return (
        <>
            <Topbar />
            <div className="bg-primary vh-100">
                <section className="text-center">
                    <div className="p-5 bg-primary" style={{ height: 200 }}></div>
                    <div> {hasAccount ? SignIn() : SignUp()}  </div>

                </section>
            </div>
        </>
    )


}