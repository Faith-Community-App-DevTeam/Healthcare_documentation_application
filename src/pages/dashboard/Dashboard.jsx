import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../components/userContext/userContext";
import PatientCard from "../../components/patientCard/PatientCard";
import NewClientForm from "../../components/forms/NewClientForm";
import fetchData from "../../components/functions/apiRequest";
import "./dashboard.css"
import DashboardClient from "./DashboardClients";
import DashbaoardHome from "./DashboardHome";
import DashboardAdmin from "./DashboardAdmin";
import DashboardForms from "./DashboardForms";
import DashboardReports from "./DashboardReports";


const Dashboard = (page) => {
    const user = useContext(UserContext).user
    const [clients, setClient] = useState()
    const [users, setUsers] = useState()
    const arr = []
    let clientList
    let userList

    useEffect(() => {
        async function getClients() {
            let data = {
                operation: 'get_user_client_list',
                payload: {
                    username: user.username,
                    token: user.token,
                }
            }
            const res = await fetchData('POST', data)

            if (!ignore && res['body']['success']) {
                setClient(res['body']["return_payload"]['client_list'])
                clientList = res['body']["return_payload"]['client_list']
            }
        }

        async function getUsers() {
            if (user.role === "admin") {
                let data = {
                    operation: 'get_user_list',
                    payload: {
                        username: user.username,
                        token: user.token,
                    }
                }

                const res = await fetchData('POST', data)


                if (!ignore && res['body']['success']) {
                    setUsers(res['body']["return_payload"])
                }

            }
        }

        let ignore = false;
        getClients()
        getUsers()
        return () => {
            ignore = true;
        }
    }, []);

    // TODO: check for page refresh.
    // useEffect(() => {
    //     if (user.user == null){

    //     }
    // })


    function choosePage() {
        if (clients) {
            switch (page.page) {
                case 'home':
                    return (<DashbaoardHome />)
                    break;
                case 'client':
                    return (<DashboardClient allClients={clients} />)
                    break;
                case 'forms':
                    return (<DashboardForms />)
                    break;
                case 'admin':
                    return (<DashboardAdmin users={users} />)
                    break;
                case 'reports':
                    return (<DashboardReports />)
            }

        }
    }


    return (
        <>
            <div className="d-flex dash-body">
                <Sidebar />
                <div className="container-fluid px-0 mx-0">
                    <Topbar page="dashboard" />
                    {choosePage()}
                    {/*  */}
                </div>
            </div>


        </>
    )
}

export default Dashboard;