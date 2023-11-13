import { useContext } from "react"
import fetchData from "../functions/apiRequest"
import UserContext from "../userContext/userContext"
import { useNavigate } from "react-router-dom"

export default function PatientCard(client) {
    const user = useContext(UserContext).user
    const nav = useNavigate()
    async function getAllClientData() {
        let data = {
            operation: "get_client",
            payload: {
                ...user,
                last_name: client.client.last_name,
                dob: client.client.date_of_birth
            }
        }
        const res = await fetchData('POST', data)
        if (res['body']['success']) {
            nav("/client", client)
            //TO DO: navigate
        }

    }

    function testClientFunc() {
        nav("/client", { state: { client } })
    }

    return (
        <>
            <div className="container-md">
                <div className="list-group">
                    <button onClick={testClientFunc} className="list-group-item list-group-item-action d-flex  mb-1 shadow-sm">
                        <div className="p-2 col-1 text-center">{client.client.client_id}</div>
                        <div className=" fw-bold p-2 col-4">{client.client.first_name + ' ' + client.client.last_name}</div>
                        <div className="p-2 col-1 text-end">{client.client.age}</div>
                        <div className="p-2 col text-start">{client.client.gender === 'Female' ? "F" : 'M'}</div>
                        <div className="p-2 col">{client.client.date_of_birth}</div>
                    </button>
                </div>
            </div>
        </>
    )
}