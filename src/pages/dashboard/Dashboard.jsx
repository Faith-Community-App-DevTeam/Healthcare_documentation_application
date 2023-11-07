import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import data from "./data.json";
import { useContext } from "react";
import UserContext from "../../components/userContext/userContext";
import PatientCard from "../../components/patientCard/PatientCard";
import NewClientForm from "../../components/forms/NewClientForm";


const Dashboard = () => {

    const getHeadings = () => {
        return Object.keys(data[0])
    }

    const getClients = () => {
        const arr = []
        for (let i = 0; i < Object.keys(data).length; i++) {
            arr.push(<PatientCard client={data[i]} />)
        }
        return arr
    }



    // to do -> want to bring up the new client form
    const handleNewClient = () => {

    }

    return (
        <>
            <div className="vh-100">
                <Topbar />
                <div className="d-flex h-100">
                    <Sidebar />
                    <div className="container-xl px-4" style={{ marginTop: 25 }}>
                        <div className="container-fluid">
                            <form action="POST" className="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Search Clients" aria-label="Search" />
                                <button class="btn btn-outline-primary" type="submit">Search</button>
                            </form>
                        </div>
                        <div className="d-flex justify-content-between m-2">
                            <h1 className="display-6 text-primary"> All Clients</h1>
                            <NewClientForm />
                        </div>
                        <hr></hr>
                        <div class="card-body table-responsive-md" style={{ maxHeight: 600 }}>
                            {getClients()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;