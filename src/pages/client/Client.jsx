import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import "./client.css";
import client_info from "./test.json"
import "bootstrap/js/dist/tab";
import UserContext from "../../components/userContext/userContext";
import fetchData from "../../components/functions/apiRequest";
import { useEffect, useContext, useState } from "react";
import DemegraphicsCard from "../../components/clientProfileCards/DemographicsCard";
import MedicalCard from "../../components/clientProfileCards/MedicalCard";

export default function Client(c) {
    const nav = useNavigate()
    const { state } = useLocation();
    const { client } = state || {};

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
                        client_id: client.client.client_id
                    }
                }
                const res = await fetchData('POST', data)
                console.log(res)

                if (!ignore && res['body']['success']) {
                    documents = res['body']["return_payload"]['document_list']
                    console.log(documents)
                }


            } catch (error) {
                alert("No Client Selected.")
                nav("/dashboard/clients")
            }



        }

        let ignore = false;
        getData()
        return () => {
            ignore = true;
        }
    }, []);

    if (!client) {
        alert("No Client Selected. Please select a Client to Continue.")
        return (<Navigate to={"/dashboard/clients"}></Navigate>)
    }


    // const client = client_info


    const date = (theDate) => {
        const d = new Date(theDate)
        return d.toLocaleDateString();
    }

    const handleNewEncounter = () => {

        nav("/new-encounter/one-to-one", { state: { client: client } })
    }
    const handleNewBP = () => {

        nav("/new-encounter/bp-screen", { state: { client: client } })
    }

    const handleFoot = () => {

        nav("/new-encounter/foot-screen", { state: { client: client } })
    }



    function handleSubmit() {
        //     e.preventDefault();
        //     const form = e.target;
        //     const formData = new FormData(form)
        //     const r = formData.getAll('race')
        //     console.log(r)
        //     formData.delete('race')
        //     formData.append("race", r)
        //     formData.append('age', age)

        //     let f = {}
        //     formData.forEach((value, key) => f[key] = value)
        //     const fJson = JSON.stringify(f)

        //     const data = {
        //         operation: "update_client",
        //         payload: {
        //             username: user.username,
        //             token: user.token,
        //             client_info: f
        //         }
        //     }

        //     console.log(data.payload.client_info)

        //     const res = await fetchData("POST", data)
        //     console.log(res)
        //     if (res['body']['success']) {
        //         console.log("success")
        //         nav("/client", { state: { client: { client } } })
        //     }
    }

    function handleUpdate() {
        const formInputs = document.getElementById('demoForm').elements;
        const updateButton = document.getElementById('updateDemoButton')
        const cancelButton = document.getElementById('clearDemoButton')
        const saveButton = document.getElementById('saveDemoButton')
        console.log(formInputs)

        for (let i = 0; i < formInputs.length; i++) {
            // Disable all form controls
            formInputs[i].setAttribute("readOnly", "false");
            formInputs[i].classList.remove('form-control-plaintext')
            formInputs[i].classList.add('form-control')
            formInputs[i].removeAttribute("readOnly")
        }


        console.log(formInputs)
        console.log(updateButton.classList)

        updateButton.classList.add("d-none")
        cancelButton.classList.remove('d-none')
        saveButton.classList.remove('d-none')

    }

    function handleCancel() {
        const formInputs = document.getElementById('demoForm').elements;
        const updateButton = document.getElementById('updateDemoButton')
        const cancelButton = document.getElementById('clearDemoButton')
        const saveButton = document.getElementById('saveDemoButton')

        document.getElementById('demoForm').reset()
        for (let i = 0; i < formInputs.length; i++) {
            // Disable all form controls
            formInputs[i].setAttribute("readOnly", "true");
            formInputs[i].classList.add('form-control-plaintext')
            formInputs[i].classList.remove('form-control')
            formInputs[i].setAttribute("readOnly", "")
        }

        updateButton.classList.remove("d-none")
        cancelButton.classList.add('d-none')
        saveButton.classList.add('d-none')
        console.log(client.client.ethnicity)

    }
    return (
        <>


            {client && (

                <div className="clientContainer d-flex">
                    <Sidebar />
                    <div className="container-fluid px-0 mx-0">
                        <Topbar page="client" />
                        <div className="clientTop p-4 pt-1 d-flex justify-content-between">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    {client.client.picture ? <img className="border border-2 border-white rounded-circle object-fit-cover me-2" alt="not found" width={"80px"} height={"80px"} src={client.client.picture} />
                                        : <span><i className="bi bi-person-circle lh-1 text-tertiary opacity-50 me-2" style={{ fontSize: "80px", fontWeight: "100" }}></i></span>
                                    }
                                </div>
                                <div className="col">
                                    <div className="d-flex align-items-center">
                                        <h1 className="me-2" style={{ fontFamily: 'var(--display-font)' }}>{client.client.first_name + " " + client.client.last_name}</h1>
                                        <span className="">({client.client.client_id})</span>
                                    </div>

                                    <div className="d-flex">
                                        <p className="me-2">
                                            <span className="fw-light">{client.client.age}, </span>
                                        </p>
                                        <p className="me-2">
                                            <span className="fw-light">{client.client.gender}</span>
                                        </p>
                                        <p className="me-2">•</p>
                                        <p>
                                            <span className="fw-light">{date(client.client.dob)}</span>
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="clientNavbar">
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
                                    <DemegraphicsCard client={client} />
                                </div>
                                <div class="tab-pane fade" id="nav-profile" role="tabpanel" tabIndex="0">
                                    <MedicalCard client={client} />
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