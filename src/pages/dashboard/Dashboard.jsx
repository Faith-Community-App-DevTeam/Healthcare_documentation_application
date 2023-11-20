import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../components/userContext/userContext";
import PatientCard from "../../components/patientCard/PatientCard";
import NewClientForm from "../../components/forms/NewClientForm";
import fetchData from "../../components/functions/apiRequest";
import "./dashboard.css"


const Dashboard = () => {
    const user = useContext(UserContext).user
    const [clients, setClient] = useState()
    const arr = []


    useEffect(() => {
        async function getData() {
            let data = {
                operation: 'get_user_client_list',
                payload: {
                    username: user.username,
                    token: user.token,
                }
            }
            const res = await fetchData('POST', data)
            console.log(res)

            if (!ignore && res['body']['success']) {
                setClient(res['body']["return_payload"]['client_list'])
            }
        }

        let ignore = false;
        getData()
        return () => {
            ignore = true;
        }
    }, []);

    // TODO: check for page refresh.
    // useEffect(() => {
    //     if (user.user == null){

    //     }
    // })


    //request basic client info from backend
    function getClients() {
        for (let i = 0; i < Object.keys(clients).length; i++) {
            arr.push(<PatientCard client={clients[i]} />)
        }
        return (arr)
    }


    return (
        <>
            <div className="">
                <Topbar page="dashboard" />
                <div className="d-flex dash-body">
                    <Sidebar />
                    <div className="container px-4 dash-content-container">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <h1 className="col text-primary" style={{ fontFamily: 'var(--display-font)' }}> All Clients</h1>

                                <form action="POST" className="col d-flex">
                                    <input className="form-control form-control-lg me-4 " type="search" placeholder="Search Clients" aria-label="Search" />

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
                        {!!clients && (<div className="card-body overflow-scroll" style={{ maxHeight: "60vh" }}>
                            {getClients()}
                        </div>)}


                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard;