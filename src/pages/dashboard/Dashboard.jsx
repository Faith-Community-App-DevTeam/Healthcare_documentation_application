import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import data from "./data.json";
import { useContext } from "react";
import UserContext from "../../components/userContext/userContext";
import PatientCard from "../../components/patientCard/PatientCard";
import NewClientForm from "../../components/forms/NewClientForm";
import fetchData from "../../components/functions/apiRequest";


const Dashboard = () => {
    const user = useContext(UserContext).user

    const arr = []

    //request basic client info from backend
    async function getClients() {
        let data = {
            operation: 'get_clients_list',
            payload: {
                ...user
            }
        }

        const res = await fetchData('POST', data)
        if (res['body']['success']) {

            const clientList = res['body']['clients']
            for (let i = 0; i < Object.keys(clientList).length; i++) {
                arr.push(<PatientCard client={clientList[i]} />)
            }
        }

    }

    // TO BE DELETED WHEN BACKEND WORKS
    function getData() {
        for (let i = 0; i < Object.keys(data).length; i++) {
            arr.push(<PatientCard client={data[i]} />)
        }
        return arr
    }

    return (
        <>
            <div className="bg-light">
                <Topbar />
                <div className="d-flex">
                    <Sidebar />
                    <div className="container-fluid px-4" style={{ marginTop: 20 }}>
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <h1 className="col text-primary"> All Clients</h1>

                                <form action="POST" className="col d-flex">
                                    <input class="form-control form-control-lg me-4 " type="search" placeholder="Search Clients" aria-label="Search" />

                                </form>

                                <div className="col text-end">
                                    <NewClientForm />
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                        <p className="fst-italic">Comprehensive list of all clients within the network. </p>
                        <div className="container list-group mb-1 card-body">
                            <div className="list-group-item d-flex  mb-1 shadow-sm">
                                <div className="p-2 col-1 text-center">ID</div>
                                <div className="p-2 col-4"> Name</div>
                                <div className="p-2 col-1 text-end"> Age</div>
                                <div className="p-2 col text-start">Gender</div>
                                <div className="p-2 col">DOB</div>
                            </div>
                        </div>
                        <div class="card-body overflow-scroll" style={{ maxHeight: "70vh" }}>

                            {getData()}
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard;