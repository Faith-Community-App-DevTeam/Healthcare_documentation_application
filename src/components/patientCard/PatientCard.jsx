import { useContext } from "react"
import fetchData from "../functions/apiRequest"
import UserContext from "../userContext/userContext"
import { useNavigate } from "react-router-dom"
import "./patientCard.css"

export default function PatientCard(client) {
    const user = useContext(UserContext).user
    const nav = useNavigate()

    async function getAllClientData() {
        let data = {
            operation: "get_client",
            payload: {
                username: user.username,
                token: user.token,
                last_name: client.client.last_name,
                dob: client.client.dob
            }
        }

        const response = await fetchData('POST', data)
        if (response['body']['success']) {
            nav("/client", { state: { client: client } })
        }
    }

    const date = (theDate) => {
        const d = new Date(theDate)
        return d.toLocaleDateString();
    }

    function getAge() {
        const thisYear = new Date().getFullYear();
        const date = new Date(client.client.dob).getFullYear();
        return (thisYear - date);
    }

    return (
        <div className="container-md">
            <div className="list-group">
                <button onClick={getAllClientData} className="list-group-item list-group-item-action d-flex align-items-center mb-2 shadow-sm">
                    <div className="p-2 col-1 pcard"><span>{client.client.client_id}</span></div>
                    <div className="p-2 col-1 pcard">{client.client.picture ? <img className="border border-2 border-black rounded-circle object-fit-cover me-2" alt="not found" width={"45px"} height={"45px"} src={client.client.picture} />
                        : <i className="bi bi-person-circle lh-1 text-body-tertiary opacity-25 me-2" style={{ fontSize: "45px", fontWeight: "200" }}></i>
                    }</div>
                    <div className=" p-2 col-md-4 col-sm-2 pcard">
                        <span>{client.client.first_name + ' ' + client.client.last_name}</span></div>
                    <div className="p-2 col-1 text-end pcard"><span>{getAge()}</span></div>
                    <div className="p-2 col-1 text-start pcard"><span>{client.client.gender === 'Female' ? "F" : 'M'}</span></div>
                    <div className="p-2 col-3  text-center pcard"><span>{date(client.client.dob)}</span></div>
                </button>
                {/* <button onClick={getAllClientData} className="list-group-item list-group-item-action d-flex align-items-center mb-2 shadow-sm">
                    <div className="hstack gap-4">
                        <div className="p-2 pcard"><span>{client.client.client_id}</span></div>
                        <div className="p-2 pcard">{client.client.picture ? <img className="border border-2 border-black rounded-circle object-fit-cover me-2" alt="not found" width={"45px"} height={"45px"} src={client.client.picture} />
                            : <i className="bi bi-person-circle lh-1 text-body-tertiary opacity-25 me-2" style={{ fontSize: "45px", fontWeight: "200" }}></i>
                        }</div>
                        <div className="p-2  text-start pcard">
                            <span>{client.client.first_name + ' ' + client.client.last_name}</span></div>
                        <div className="p-2 pcard ms-auto"><span>{getAge()}</span></div>
                        <div className="p-2 pcard"><span>{client.client.gender === 'Female' ? "F" : 'M'}</span></div>
                        <div className="p-2 pcard"><span>{date(client.client.dob)}</span></div>
                    </div>

                </button> */}


            </div>
        </div>
    )

}