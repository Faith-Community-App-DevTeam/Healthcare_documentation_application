import { useContext } from "react"
import fetchData from "../functions/apiRequest"
import UserContext from "../userContext/userContext"
import { useNavigate } from "react-router-dom"
import "./patientCard.css"

export default function PatientCard(patient) {
    const user = useContext(UserContext).user
    const nav = useNavigate()

    async function getAllPatientData() {
        let data = {
            // patients still called clients on backend after Beverly's change on Dec 12.
            operation: "get_client",
            payload: {
                username: user.username,
                token: user.token,
                last_name: patient.patient.last_name,
                dob: patient.patient.dob
            }
        }

        const response = await fetchData('POST', data)
        if (response['body']['success']) {
            console.log(response)
            nav("/patient", { state: { patient: patient } })
        }
    }

    const date = (theDate) => {
        const d = new Date(theDate)
        return d.toLocaleDateString();
    }

    function getAge() {
        const thisYear = new Date().getFullYear();
        const date = new Date(patient.patient.dob).getFullYear();
        return (thisYear - date);
    }

    return (
        // <div className="container-md">
        //     <div className="list-group">
        //         <button onClick={getAllClientData} className="list-group-item list-group-item-action d-flex align-items-center mb-2 shadow-sm">
        //             <div className="p-2 col-1 pcard"><span>{patient.patient.client_id}</span></div>
        //             <div className="p-2 col-1 pcard">{patient.patient.picture ? <img className="border border-2 border-black rounded-circle object-fit-cover me-2" alt="not found" width={"45px"} height={"45px"} src={patient.patient.picture} />
        //                 : <i className="bi bi-person-circle lh-1 text-body-tertiary opacity-25 me-2" style={{ fontSize: "45px", fontWeight: "200" }}></i>
        //             }</div>
        //             <div className=" p-2 col-md-4 col-sm-2 pcard">
        //                 <span>{patient.patient.first_name + ' ' + patient.patient.last_name}</span></div>
        //             <div className="p-2 col-1 text-end pcard"><span>{getAge()}</span></div>
        //             <div className="p-2 col-1 text-start pcard"><span>{patient.patient.gender === 'Female' ? "F" : 'M'}</span></div>
        //             <div className="p-2 col-3  text-center pcard"><span>{date(patient.patient.dob)}</span></div>
        //         </button>

        //     </div>
        // </div>

        <tr className="shadow-sm" onClick={getAllPatientData}>
            <td className="p-3 text-center"><span>{patient.patient.client_id}</span></td>
            <td className="p-3 text-center">
                {patient.patient.picture ? <img className="border border-2 border-black rounded-circle object-fit-cover me-2" alt="not found" width={"45px"} height={"45px"} src={patient.patient.picture} />
                    : <i className="bi bi-person-circle lh-1 text-body-tertiary opacity-25 me-2" style={{ fontSize: "45px", fontWeight: "200" }}></i>}
            </td>
            <td className="p-3">
                <span>{patient.patient.first_name + ' ' + patient.patient.last_name}</span>
            </td>
            <td className="p-3 text-end"><span>{getAge()}</span></td>
            <td className="p-3 text-start">{patient.patient.gender === 'Female' || patient.patient.gender === 'female' ? "F"
                : patient.patient.gender === 'Male' || patient.patient.gender === 'male' ? "M"
                    : "-"}</td>
            <td className="p-3"><span>{date(patient.patient.dob)}</span></td>
            {user.role == "admin" && user.isLoggedIn
                ? <td className="p-3 text-center"><button className="btn"><i className="bi bi-x-lg"></i></button></td>
                : ""}

        </tr>

    )

}