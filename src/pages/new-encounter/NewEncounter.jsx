import Topbar from "../../components/topbar/Topbar";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../components/userContext/userContext";
import fetchData from "../../components/functions/apiRequest";
import OneToOneIntForm from "../../components/forms/OneToOneIntForm";
import { useNavigate } from "react-router-dom";
import "./newEncounter.css"
import BloodPressureForm from "../../components/forms/BloodPressureForm";
import IndFootScreening from "../../components/forms/IndFootScreening";

export default function NewEncounter(props) {
    const { state } = useLocation();
    const { patient } = state;
    const user = useContext(UserContext).user
    const nav = useNavigate()
    const [message, setMessage] = useState("")
    const form = props.form


    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        if (message === "Success") {
            nav("/patient", { state: { patient: patient } })
        }

    })

    return (
        <>
            <div className="containter-fluid bg-light">
                <Topbar page="patient" />
                <div className="d-flex">
                    <div className="container-fluid mt-3 px-4">
                        <div className="row">
                            <div className="col-md-auto col-sm">
                                <button className="btn btn-outline-primary" onClick={() => { nav("/patient", { state: { patient: patient } }) }}>Back to Patient Profile</button>
                            </div>
                            <div className="col">
                                {form === "ind" ? <OneToOneIntForm patient={patient} setMessage={setMessage} />
                                    : form === "bp" ? <BloodPressureForm patient={patient} setMessage={setMessage} />
                                        : form === "foot" ? <IndFootScreening patient={patient} setMessage={setMessage} />
                                            : ""}
                            </div>
                            <div className="col-md-auto col-sm">
                                <button className="btn btn-outline-primary invisible" onClick={() => { nav("/patient", { state: { patient: patient } }) }}>Back to Patient Profile</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div >
        </>
    )
}