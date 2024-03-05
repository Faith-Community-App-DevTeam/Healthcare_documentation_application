import { useContext, useState } from "react";
import PatientCard from "../../components/patientCard/PatientCard";
import UserContext from "../../components/userContext/userContext";
import NewPatientForm from "../../components/forms/NewPatientForm";
import "./dashboard.css"
import SearchBar from "../../components/forms/SearchBar";




export default function DashboardPatients(allPatients) {
    let table = allPatients.allPatients.map(patient => <PatientCard key={patient.client_id} patient={patient} />)
    const [sort, changeSort] = useState('')
    const [searchedPatient, setSearchedPatient] = useState("")
    const user = useContext(UserContext).user

    function sortTable(param) {
        //TODO: still adds sorted list to bottom of already generated list.
        if (!param) {
            return table
        }
        const pcards = [...table]
        pcards.sort((a, b) => {
            const aParam = a.props.patient[param]
            const bParam = b.props.patient[param]
            return aParam.localeCompare(bParam)
        })
        table = pcards
        return table
        //return allPatients.allPatients.map(patient => <PatientCard key={patient.client_id} patient={patient} />)
    }

    //create table elements from client data
    function getPatients() {
        if (searchedPatient) {
            return searchedPatient.map(patient => <PatientCard key={patient.client_id} patient={patient} />)
        } else {
            return sortTable(sort)
        }

    }


    return (
        <>
            <div className="container">
                <div className="p-3">
                    <div className="row mb-3">
                        <div className="col">
                            <h1 className="text-black" style={{ fontFamily: 'var(--display-font)' }}>Patient Lists</h1>
                        </div>
                        <div className="col-auto">
                            <NewPatientForm />
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-between">
                        <div className="col-lg-5 col-sm-auto">
                            <nav>
                                <div class="nav nav-underline nav-justified" id="nav-tab" role="tablist">
                                    <button class="nav-link" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-userPatients" type="button" role="tab" >My Patients</button>
                                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-churchPatients" type="button" role="tab" >Church Patients</button>
                                    <button class="nav-link active" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-networkPatients" type="button" role="tab" >Network Patients</button>
                                </div>
                            </nav>
                        </div>
                        <div className="col-lg-3 col-auto">
                            <SearchBar patients={allPatients} type="patient" setSearch={setSearchedPatient} />
                        </div>
                        <div className="col-1">

                        </div>
                    </div>
                    <hr className="mt-0" />

                    {/* Generated Tables */}
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade" id="nav-userPatients" role="tabpanel" tabIndex="0">
                            <h1>User Patients</h1>
                        </div>
                        <div class="tab-pane fade" id="nav-churchPatients" role="tabpanel" tabIndex="0">
                            <h1>Church Patients</h1>
                        </div>
                        <div class="tab-pane fade show active" id="nav-networkPatients" role="tabpanel" tabIndex="0">
                            <div className="row">
                                <h6 className="lead fst-italic mb-3">Comprehensive list of all patients within the network.</h6>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col">
                                    <div className="position-relative overflow-scroll" style={{ height: "70vh" }}>
                                        <table className="table table-hover align-middle" id="clientTable">
                                            <thead className="table-light sticky-top top-0">
                                                <tr>
                                                    <th scope="col" className="text-center" style={{ width: 150 }} onClick={() => changeSort('client_id')}>ID</th>
                                                    <th scole="col " style={{ width: 100 }}>Picture</th>
                                                    <th scope="col" onClick={() => changeSort('first_name')}>Name</th>
                                                    <th scope="col" className="text-end" style={{ width: 100 }}>Age</th>
                                                    <th scope="col" className="text-start" style={{ width: 100 }}>Gender</th>
                                                    <th scope="col">DOB</th>
                                                    {user.role == "admin" && user.isLoggedIn ? <th scope="col" style={{ width: 60 }}><i className="bi bi-x-lg"></i></th> : ""}


                                                </tr>
                                            </thead>

                                            <tbody>
                                                {!!allPatients && getPatients()}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>



                </div>
            </div>


        </>
    )
}