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
            operation: 'get_clients_by_network',
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
                    <div className="container px-4" style={{ marginTop: 20 }}>
                        <div className="container-fluid">
                            <div className="d-flex justify-content-between m-2">
                                <h1 className="display-6 text-primary"> All Clients</h1>
                                <NewClientForm />
                            </div>
                            <hr></hr>
                            <form action="POST" className="container-fluid d-flex">
                                <input class="form-control form-control-lg me-4 mb-4" type="search" placeholder="Search Clients" aria-label="Search" />
                                <button class="btn btn-outline-primary mb-4" type="search">Search</button>
                            </form>
                        </div>
                        <div class="card-body overflow-scroll table-responsive-md" style={{ maxHeight: 650 }}>
                            {getData()}
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;