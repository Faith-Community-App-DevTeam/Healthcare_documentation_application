import { useState, useContext } from "react";
import UserContext from "../../components/userContext/userContext";
import fetchData from "../../components/functions/apiRequest";

export default function PastInteractionsCard(props) {
    const patient = props.patient.patient
    const user = useContext(UserContext).user
    const [monthPicked, setMonthPicked] = useState("");
    const [yearPicked, setYearPicked] = useState("")
    const [documents, setDocuments] = useState("")



    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)

        let f = {}
        formData.forEach((value, key) => f[key] = value)
        const fJson = JSON.stringify(f)



        let data = {
            operation: 'get_client_document_list',
            payload: {
                username: user.username,
                token: user.token,
                month: monthPicked,
                year: yearPicked,
                client_id: patient.client_id
            }
        }
        const res = await fetchData('POST', data)

        if (res['body']['success']) {
            setDocuments(res['body']["return_payload"]['document_list'])
            console.log(documents)
        }

    }

    function handleDocuments() {
        console.log(documents)
        let docs = documents.map((item, i) => {
            return (
                <li className="list-group-item" key={i}>
                    <span>{item.date}</span>
                    <p>{item.document_type}</p>
                </li>
            )
        });
        return (<ul className="list-group">{docs}</ul>);

    }



    return (
        <div className="row">
            <div className="col">
                <div className="card shadow histCard">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center pt-2">
                            <h5 className="lead fs-3">Past Interactions</h5>

                        </div>
                    </div>
                    <div className="card-body bg-white ">
                        <div className="row p-3 pt-0">
                            <form method="POST" className="p-4" id="PastIntForm" onSubmit={handleSubmit}>
                                <div className="row">
                                    <label htmlFor="monthSelect" className="col-form-label col-sm-4">Please select a time period.</label>
                                    <div className="col-sm-4">
                                        <select name="month" id="monthSelect" className="form-select" onChange={(e) => { setMonthPicked(e.target.value) }}>
                                            <option value="00" selected disabled>Select Month:</option>
                                            <option value="01">January</option>
                                            <option value="02">February</option>
                                            <option value="03">March</option>
                                            <option value="04">April</option>
                                            <option value="05">May</option>
                                            <option value="06">June</option>
                                            <option value="07">July</option>
                                            <option value="08">August</option>
                                            <option value="09">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-4">
                                        <input type="number" className="form-control" min="2023" max="2099" step="1" onChange={(e) => { setYearPicked(e.target.value) }} />
                                    </div>
                                </div>



                            </form>
                            <hr />
                            {/* load documents */}
                            <div className='list'>
                                {documents.length ? handleDocuments() : <p>No Documents Found</p>}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}