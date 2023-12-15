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
    const [errMsg, setErrMsg] = useState("")
    const [validPwMsg, setValidPwMsg] = useState("Your password must be 8-20 characters long, and contain only letters, at least one number, and at least one special character.")
    const [pwMsg, setPwMsg] = useState("")

    const SignIn = () => {
        return (
            <>
                <h2 className="display-5 mb-4 login-title">Sign in and Connect With Us</h2>
                <h6 className='card-subtitle mb-3 text-danger' id="error-msg">{errMsg}</h6>
                <form action="POST" onSubmit={handleSubmit}>
                    <div className="form-floating mb-4">
                        <input type="text" className="form-control form-control-lg h-25" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" placeholder='Username' />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="password" className="form-control form-control-lg h-25" id="password" name="password" placeholder='Password' />
                        <label htmlFor="floatingInput">Password</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg w-50" >Sign in</button>
                </form>
                <div className='mt-3'>
                    <NavLink to="/register">Don't have an account? Register for access</NavLink>
                </div>
            </>
        )
    }

    const SignUp = () => {
        return (
            <>
                <h2 className="display-5 mb-5 login-title">Join a Community of Care</h2>
                <h6 className='card-subtitle mb-3 text-danger' id="error-msg">{errMsg}</h6>
                <form action="POST" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-floating mb-4">
                                <input type="text" className="form-control form-control-lg" id="firstName" name="first_name" placeholder='First Name' required />
                                <label htmlFor="floatingInput">First Name <span className='text-primary'>*</span></label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mb-4">
                                <input type="text" className="form-control form-control-lg" id="lastName" name="last_name" placeholder='Last Name' required />
                                <label htmlFor="floatingInput">Last Name <span className='text-primary'>*</span></label>
                            </div>
                        </div>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="email" name="email" id="email" placeholder='Email' className='form-control form-control-lg' required />
                        <label htmlFor="floatingInput">Email Address <span className='text-primary'>*</span></label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="text" className="form-control form-control-lg" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" placeholder='Username' required />
                        <label htmlFor="floatingInput">Username <span className='text-primary'>*</span></label>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-4">

                                <input type="password" className="form-control form-control-lg" onChange={(e) => validatePassword(e.target.value)} id="password" name="password" placeholder='Password' autoComplete='off' required />
                                <label htmlFor="floatingInput">Password <span className='text-primary'>*</span></label>
                                <div id="passwordHelpBlock" className="form-text">
                                    {validPwMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-4">
                                <input type="password" className="form-control form-control-lg" onChange={(e) => handlePasswords(e)} id="passwordConfirm" name="passwordConfirm" placeholder='Confirm Password' required />
                                <label htmlFor="floatingInput">Confirm Password <span className='text-primary'>*</span></label>
                                <div id="passwordHelpBlock" className="form-text">
                                    {pwMsg}
                                </div>
                            </div>
                        </div>
                    </div>


                    <button type="submit" className="btn btn-primary btn-lg w-50" >Register</button>
                </form>
                <div className='mt-3'>
                    <NavLink to="/login">Already have an account? Sign in</NavLink>
                </div>
            </>
        )
    }

    function validatePassword(value) {


        const validPassword = (
            /[A-Za-z]/.test(value))
        const tooShort = (value.length < 8)
        const tooLong = (value.length > 20)
        const hasDigit = (/[0-9]/.test(value))
        const hasSpcChar = (/[^A-Za-z0-9]/.test(value))

        if (tooShort) {
            setValidPwMsg("Invalid Password: Password Too Short. Must have 8-20 characters")
        } else if (tooLong) {
            setValidPwMsg("Invalid Password: Password Too Long. Must have 8-20 characters")
        } else if (!hasDigit) {
            setValidPwMsg("Invalid Password: Missing at least one digit")
        } else if (!hasSpcChar) {
            setValidPwMsg("Invalid Password: Missing at least one Special Character")
        } else if (!validPassword) {
            setValidPwMsg("Invalid Password: Password doesn't contain any letters")
        }
        else {
            setValidPwMsg("")
            setPassword(value)
            console.log('pw true')
            return true
        }

        console.log(password)
        return false

    }

    function handlePasswords(e) {
        //check if passwords match
        if (e.target.value != password) {
            setPwMsg("Passwords Don't Match")
            return false
        } else {
            setPwMsg("")
            return true
        }
    }

    async function handleSubmit(e) {
        e.preventDefault(); //prevents redirect

        //get form values
        const form = e.target;
        const formData = new FormData(form)
        formData.delete("passwordConfirm")
        let f = {}
        //convert to object
        formData.forEach((value, key) => f[key] = value)



        if (password !== "") {
            if (!validatePassword(password)) {
                setErrMsg("Invalid Password. Try Again")
                return
            }
        }
        const operation = (hasAccount ? "user_login" : "create_user")
        const data = {
            operation: operation,
            payload: {
                ...f
            }
        }
        console.log(password)


        //send data to backend
        const res = await fetchData("POST", data)
        console.log(res)
        if (res['body']['success']) {
            //set the User context
            setUser({
                ...res['body']['return_payload'],
                username: username,
                isLoggedIn: true,
            });
            // store username and token in sessionStorage
            const u = {
                username: username,
                token: res['body']['return_payload']['token']
            }
            sessionStorage.setItem("auth", JSON.stringify(u))
            // redirect to new page
            navigate("/dashboard/patients");
        } else if (res["statusCode"] === 404) {
            setErrMsg("Incorrect username or password")
        } else {

            setErrMsg("Server error. Please try again.")
        }

    }
    return (
        <>
            <Topbar page="login" />
            <div className="body-background">
                <section className="container text-center align-content-center">
                    <div className='bg-primary' style={{ height: 100 }}></div>

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