import { useContext, useState } from "react";
import PatientCard from "../../components/patientCard/PatientCard";
import UserContext from "../../components/userContext/userContext";
import NewPatientForm from "../../components/forms/NewPatientForm";
import "./dashboard.css"
import SearchBar from "../../components/forms/SearchBar";




export default function DashboardPatients(allPatients) {
    const [table, setTable] = useState(allPatients.allPatients.map(patient => <PatientCard key={patient.client_id} patient={patient} />))
    const [searchedPatient, setSearchedPatient] = useState("")
    const user = useContext(UserContext).user


    function sortTable(param) {

        const pcards = [].concat(table)
            .sort((a, b) => {
                const aParam = a.props.client[param]
                const bParam = b.props.client[param]
                return aParam.localeCompare(bParam)
            })
        setTable(pcards)
        console.log(pcards.map((a) => a.props.client))
    }

    //create table elements from client data
    function getPatients() {
        if (searchedPatient) {
            return searchedPatient.map(patient => <PatientCard key={patient.client_id} patient={patient} />)
        } else {
            return table
        }

    }


    return (
        <>
            <div className="container-fluid">
                <div className="card p-2 bg-transparent border-0" >
                    <div className="card-body">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-auto col-sm">
                                <h1 className="text-primary" style={{ fontFamily: 'var(--display-font)' }}> All Patients</h1>
                            </div>
                            <div className="col mx-3">
                                <SearchBar patients={allPatients} type="patient" setSearch={setSearchedPatient} />
                            </div>
                            <div className="col-auto ">
                                <NewPatientForm />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="mt-0" />
                {/* <div className="container px-5">

                    <div className=" list-group mb-1 card-body">
                        <div className="list-group-item d-flex  mb-1 shadow-sm">
                            <div className="p-2 col-2"><button className="btn" onClick={() => sortTable("client_id")}>ID</button></div>
                            <div className="p-2 col-1 text-center"></div>
                            <div className="p-2 col-md-3 col-sm-2"><button className="btn" onClick={() => sortTable("first_name")}>Name</button></div>
                            <div className="p-2 col-1 text-end"><button className="btn" >Age</button></div>
                            <div className="p-2 col text-start"><button className="btn">Gender</button></div>
                            <div className="p-2 col-3"><button className="btn" onClick={() => sortTable('dob')}>DOB</button></div>
                        </div>
                    </div>
                    {!!allPatients && (<div className="card-body overflow-scroll" id="clientsTable" style={{ maxHeight: "60vh" }}>
                        
                        {getClients()}

                    </div>)}

                </div> */}




                <div className="container">
                    <div className="card-body">
                        <p className="lead fst-italic">Comprehensive list of all patients within the network.</p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="table-responsive overflow-scroll" style={{ height: "70vh" }}>
                                <table className="table table-hover align-middle" id="clientTable">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col" className="text-center" style={{ width: 150 }}>ID</th>
                                            <th scole="col " style={{ width: 100 }}>Picture</th>
                                            <th scope="col">Name</th>
                                            <th scope="col" className="text-end" style={{ width: 100 }}>Age</th>
                                            <th scope="col" className="text-start" style={{ width: 100 }}>Gender</th>
                                            <th scope="col">DOB</th>
                                            {user.role == "admin" && user.isLoggedIn ? <th scope="col" style={{ width: 60 }}><i className="bi bi-x-lg"></i></th> : ""}


                                        </tr>
                                    </thead>
                                    {/* <tbody className="placeholder-wave" id="loading">
                                        <tr>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                            <td>
                                                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
                                            </td>
                                        </tr>
                                    </tbody> */}
                                    <tbody>
                                        {!!allPatients && getPatients()}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}