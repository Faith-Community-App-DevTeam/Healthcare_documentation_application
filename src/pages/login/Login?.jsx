import { useState, useContext } from 'react';
import Topbar from '../../components/topbar/Topbar';
//import './login.css'
import { AuthContext } from '../../components/authContext/AuthContext';
import LoginForm from '../../components/loginForm/LoginForm';
import RegisterUserForm from '../../components/registerUserForm/RegisterUserForm';

export default function Login(isRegistered) {

    console.log(isRegistered)
    let form = <div>bleh</div>

    if (isRegistered) {
        form = (
            <div className="bg-primary" style={{ height: "100vh" }}>
                <section className="text-center">
                    <div className="p-5 bg-primary" style={{ height: 200 }}></div>
                    <RegisterUserForm />
                </section>
            </div>

        )
    }


    // form = (<div className="text-center" style={{ height: "100vh" }}>
    //     <div className="container-xxl h-100 d-flex align-items-center justify-content-center bg-white">
    //         <div className="row">
    //             <div className="col-xl-6 my-auto">
    //                 <h1 className="display-1 text-center">Log in and Connect with Us</h1>
    //             </div>
    //             <div className="col-xl-6 my-auto">
    //                 <LoginForm />
    //             </div>
    //         </div>
    //     </div>
    // </div>)

    // } else {
    //     form = <div className="login">
    //         <div className="login-left-side">
    //             <h1 className="login-title">Join a Community of Care</h1>
    //         </div>
    //         <RegisterUserForm />
    //     </div>
    // }

    return (
        <>
            <Topbar />
            {form}
        </>
    )



    // need to fix the login link in the topbar, goes to /login/login
    // return (
    //     <>
    //         <Topbar />
    //         <div className="login">
    //             <div className="login-left-side">
    //                 <h1 className="login-title">Join a Community of Care</h1>
    //                 <h1 className="login-title">or</h1>
    //                 <h1 className="login-title">Log In and Connect with Us</h1>
    //             </div>
    //             <div className="login-box">
    //                 <form className="login-form" onSubmit={handleSubmit}>
    //                     <h2 className="welcome">Login</h2>
    //                     <div className="inputs">
    //                         <div>
    //                             <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" type="text" placeholder='Username'></input>
    //                         </div>

    //                         <div>
    //                             <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="username" type="password" placeholder='Password'></input>
    //                         </div>
    //                     </div>
    //                     <button className="login-button">Log In</button>
    //                 </form>
    //             </div>
    //         </div >

    //     </>
    // )
}