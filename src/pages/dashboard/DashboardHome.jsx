import UserContext from "../../components/userContext/userContext";
import { useContext, useEffect, useState } from "react";

export default function DashbaoardHome() {
    const { user, setUser } = useContext(UserContext)

    return (
        <div className="container">
            <div className="card my-4 text-center">
                <div className="card-body">
                    <h1 className="display-6 text-primary" style={{ fontFamily: 'var(--display-font)' }}>Hello {user.username}!</h1>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="mb-4 home-card">
                        <h6 className="m-2">Recents</h6>
                        <div className="card h-100">
                            <div className="card-body">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-4 home-card">
                        <h6 className="m-2">Messages</h6>
                        <div className="card bg-white h-100">
                            <div className="card-body">

                            </div>
                        </div>
                    </div>
                </div>

            </div>





        </div>
    )
}