import { NavLink } from "react-router-dom";
import UserContext from "../../components/userContext/userContext";
import { useContext, useEffect, useState } from "react";


export default function DashbaoardHome() {
    const { user, setUser } = useContext(UserContext)

    return (
        <div className="container-fluid">
            <div className="card p-2 bg-transparent border-0 " >
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="text-primary mx-3 text-center" style={{ fontFamily: 'var(--display-font)' }}>Welcome {user.username}!</h1>
                        <NavLink to={"/profile"} className={"btn btn-secondary"}>Your Profile</NavLink>
                    </div>
                </div>
            </div>
            <hr className="mt-0" />
            <div className="container">
                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="mb-4 home-card">
                            <h5 className="m-2 lead">Recents</h5>
                            <div className="card h-100 shadow">
                                <div className="card-body">
                                    <p className="text-primary lead">To Do</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-4 home-card">
                            <h5 className="m-2 lead">Messages</h5>
                            <div className="card shadow bg-white h-100">
                                <div className="card-body">
                                    <p className="text-primary lead">To Do</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>






        </div>
    )
}