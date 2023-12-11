import Topbar from "../../components/topbar/Topbar";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../components/userContext/userContext";
import fetchData from "../../components/functions/apiRequest";
import OneToOneIntForm from "./OneToOneIntForm";
import { useNavigate } from "react-router-dom";
import "./newEncounter.css"
import BloodPressureForm from "./BloodPressureForm";
import IndFootScreening from "./IndFootScreening";

export default function NewEncounter(props) {
    const { state } = useLocation();
    const { client } = state;
    const user = useContext(UserContext).user
    const nav = useNavigate()
    const [message, setMessage] = useState("")
    const form = props.form


    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        if (message === "Success") {
            nav("/client", { state: { client: client } })
        }

    })

    return (
        <>
            <div className="containter-fluid bg-light">
                <Topbar page="client" />
                <div className="d-flex">
                    <div className="container-fluid mt-3 px-4">
                        <div className="row">
                            <div className="col-md-auto col-sm">
                                <button className="btn btn-outline-primary" onClick={() => { nav("/client", { state: { client: client } }) }}>Back to Client Profile</button>
                            </div>
                            <div className="col">
                                {form === "ind" ? <OneToOneIntForm client={client} setMessage={setMessage} />
                                    : form === "bp" ? <BloodPressureForm client={client} setMessage={setMessage} />
                                        : form === "foot" ? <IndFootScreening client={client} setMessage={setMessage} />
                                            : ""}
                            </div>
                            <div className="col-md-auto col-sm">
                                <button className="btn btn-outline-primary invisible" onClick={() => { nav("/client", { state: { client: client } }) }}>Back to Client Profile</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div >
        </>
    )
}