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

    function testClientFunc() {
        nav("/client", {
            state: {
                last_name: client.client.last_name,
                dob: client.client.dob
            }
        })
    }

    return (

        <>
            <div className="container-md">
                <div className="list-group" style={{ backgroundColor: 'var(--color2)' }}>
                    <button onClick={getAllClientData} className="list-group-item list-group-item-action d-flex  mb-1 shadow-sm">
                        <div className="p-2 col-1 text-center pcard"><span>{client.client.client_id}</span></div>
                        <div className=" p-2 col-4 pcard"><span>{client.client.first_name + ' ' + client.client.last_name}</span></div>
                        <div className="p-2 col-1 text-end pcard"><span>{client.client.age}</span></div>
                        <div className="p-2 col text-start pcard"><span>{client.client.gender === 'Female' ? "F" : 'M'}</span></div>
                        <div className="p-2 col pcard"><span>{client.client.dob}</span></div>
                    </button>
                </div>
            </div>
        </>
    )

}