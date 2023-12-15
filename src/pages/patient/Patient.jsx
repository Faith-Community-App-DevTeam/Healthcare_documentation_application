import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./patient.css";
import "bootstrap/js/dist/tab";
import UserContext from "../../components/userContext/userContext";
import fetchData from "../../components/functions/apiRequest";
import { useEffect, useContext, useState } from "react";
import DemegraphicsCard from "../../components/clientProfileCards/DemographicsCard";
import MedicalCard from "../../components/clientProfileCards/MedicalCard";

export default function Client(c) {
    const nav = useNavigate()
    const { state } = useLocation();
    const { patient } = state || {};

    const user = useContext(UserContext).user
    let documents

    useEffect(() => {

        async function getData() {
            try {
                let data = {
                    operation: 'get_client_document_list',
                    payload: {
                        username: user.username,
                        token: user.token,
                        month: '12',
                        year: '2023',
                        client_id: patient.patient.client_id
                    }
                }
                const res = await fetchData('POST', data)

                if (!ignore && res['body']['success']) {
                    documents = res['body']["return_payload"]['document_list']
                }


            } catch (error) {
                alert("No Client Selected.")
                nav("/dashboard/patients")
            }



        }

        let ignore = false;
        getData()
        return () => {
            ignore = true;
        }
    }, []);

    if (!patient) {
        alert("No Client Selected. Please select a Client to Continue.")
        return (<Navigate to={"/dashboard/patients"}></Navigate>)
    }


    const date = (theDate) => {
        const d = new Date(theDate)
        return d.toLocaleDateString();
    }

    const handleNewEncounter = () => {

        nav("/new-encounter/one-to-one", { state: { patient: patient } })
    }
    const handleNewBP = () => {

        nav("/new-encounter/bp-screen", { state: { patient: patient } })
    }

    const handleFoot = () => {

        nav("/new-encounter/foot-screen", { state: { patient: patient } })
    }


    return (
        <>


            {patient && (

                <div className="patientContainer d-flex">
                    <Sidebar />
                    <div className="container-fluid px-0 mx-0">
                        <Topbar page="patient" />
                        <div className="patientTop p-4 pt-1 d-flex justify-content-between">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    {patient.patient.picture ? <img className="border border-2 border-white rounded-circle object-fit-cover me-2" alt="not found" width={"80px"} height={"80px"} src={patient.patient.picture} />
                                        : <span><i className="bi bi-person-circle lh-1 text-tertiary opacity-50 me-2" style={{ fontSize: "80px", fontWeight: "100" }}></i></span>
                                    }
                                </div>
                                <div className="col">
                                    <div className="d-flex align-items-center">
                                        <h1 className="me-2" style={{ fontFamily: 'var(--display-font)' }}>{patient.patient.first_name + " " + patient.patient.last_name}</h1>
                                        <span className="">({patient.patient.client_id})</span>
                                    </div>

                                    <div className="d-flex">
                                        <p className="me-2">
                                            <span className="fw-light">{patient.patient.age}, </span>
                                        </p>
                                        <p className="me-2">
                                            <span className="fw-light">{patient.patient.gender}</span>
                                        </p>
                                        <p className="me-2">•</p>
                                        <p>
                                            <span className="fw-light">{date(patient.patient.dob)}</span>
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="patientNavbar">
                            <nav>
                                <div class="nav nav-underline justify-content-center" id="nav-tab" role="tablist">
                                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" >Summary</button>
                                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" >Medical History</button>
                                    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" >Past Interactions</button>
                                    <button class="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" >Notes</button>
                                </div>
                            </nav>
                        </div>
                        <div className="container mt-1 d-flex justify-content-between">
                            <div class="tab-content px-5" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" tabIndex="0">
                                    <DemegraphicsCard patient={patient} />
                                </div>
                                <div class="tab-pane fade" id="nav-profile" role="tabpanel" tabIndex="0">
                                    <MedicalCard patient={patient} />
                                </div>
                                <div class="tab-pane fade" id="nav-contact" role="tabpanel" tabIndex="0">

                                    <h5 className="display-6 text-center">Past Interactions</h5>

                                </div>
                            </div>

                            <div className="col-auto" >
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="container-fluid p-0 m-0">
                                            <nav className="navbar nav flex-column bg-white">
                                                <h4 className="fw-light mb-3">New Interactions</h4>
                                                <ul className="nav nav-pills nav-justified">
                                                    <li className="nav-item">
                                                        <button className="nav-link" onClick={handleNewEncounter}>One-to-One</button>
                                                    </li>
                                                </ul>
                                                <ul className="nav nav-pills nav-justified">
                                                    <li className="nav-item">
                                                        <button className="nav-link" onClick={handleNewBP}>BP Screening</button>
                                                    </li>
                                                </ul>
                                                <ul className="nav nav-pills nav-justified">
                                                    <li className="nav-item">
                                                        <button className="nav-link" onClick={handleFoot}>Foot Care Screening</button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div >



                </div >

            )
            }
        </>
    )
}