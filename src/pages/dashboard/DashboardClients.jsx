import { useContext, useEffect, useState } from "react";
import PatientCard from "../../components/patientCard/PatientCard";
import UserContext from "../../components/userContext/userContext";
import NewClientForm from "../../components/forms/NewClientForm";
import fetchData from "../../components/functions/apiRequest";
import "./dashboard.css"
import SearchBar from "../../components/forms/SearchBar";



export default function DashboardClient(allClients) {
    const user = useContext(UserContext).user
    const [table, setTable] = useState(allClients.allClients.map(client => <PatientCard key={client.client_id} client={client} />))
    const [searchedClient, setSearchedClient] = useState("")



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




    console.log(searchedClient)

    // TODO: check for page refresh.
    //     useEffect(() => {
    //         if (user.user == null) {

    //         }
    //     })


    //create table elements from client data
    function getClients() {
        if (searchedClient) {
            return searchedClient.map(client => <PatientCard key={client.client_id} client={client} />)
        } else {
            return table
        }

    }


    return (
        <>
            <div className="container-fluid">
                <div className="card p-2 bg-transparent border-0" >
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <h1 className="text-primary mx-3" style={{ fontFamily: 'var(--display-font)' }}> All Clients</h1>
                            <div className="">
                                <NewClientForm />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="mt-0" />
                <div className="container px-5">
                    <SearchBar clients={allClients} type="clients" setSearch={setSearchedClient} />
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
                    {!!allClients && (<div className="card-body overflow-scroll" id="clientsTable" style={{ maxHeight: "60vh" }}>
                        {/* {searchedClient ? setTable(searchedClient.map(client => <PatientCard key={client.client_id} client={client} />)) : ""} */}
                        {getClients()}

                    </div>)}

                </div>




                {/* <div className="container">
                    <div className="card overflow-scroll mb-7" style={{ maxHeight: "70vh" }}>
                        <div className="card-header fst-italic">Comprehensive list of all clients.</div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle text">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col" style={{ width: 100 }}>ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col" style={{ width: 100 }}>Age</th>
                                        <th scope="col" style={{ width: 100 }}>Gender</th>
                                        <th scope="col">DOB</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="loading placeholder-wave">
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


                        </tbody>
                                <tbody>
                                    {!!allClients && getClients()}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>*/}
            </div>


        </>
    )
}