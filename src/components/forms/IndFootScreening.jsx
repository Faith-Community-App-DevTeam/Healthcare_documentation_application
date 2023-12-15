import { useContext, useState } from "react";
import UserContext from "../userContext/userContext";
import fetchData from "../functions/apiRequest";
import NICTable from "../Tables/NICTable";

export default function IndFootScreening(props) {
    const user = useContext(UserContext).user
    const patient = props.patient.patient

    const [location, setLocation] = useState("")
    let [selectedInterventions, setSelectedInterventions] = useState([])
    const [date, setDate] = useState(() => {
        const now = new Date().toLocaleDateString('en-CA');
        return now;
    })
    const otherLocation = (
        <div className="col-auto">
            <label htmlFor="otherLocation" className="form-label">Location:</label>
            <input type="text" className="form-control mb-3" id="otherLocation" name="location" required />
        </div>
    )


    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const o = formData.getAll('Outcome')
        formData.delete('Outcome')
        formData.append('Outcome', o)
        formData.append("Interventions", selectedInterventions)

        let f = {}
        formData.forEach((value, key) => f[key] = value)


        const data = {
            operation: "create_document",
            payload: {
                username: user.username,
                token: user.token,
                document_info: { ...f }
            }
        }
        console.log(data)
        const res = await fetchData("POST", data)
        console.log(res)
        if (res['body']['success']) {
            console.log("success")
            props.setMessage("Success")
        }
    }


    return (

        <div className="container ">
            <div className="card bg-white mb-5">
                <h4 class="text-center mt-3" id="formTitle">Foot Care Screening</h4>
                <hr  ></hr>
                <div className="card-body">
                    <div className="p-4 py-0">
                        <form action="POST" onSubmit={handleSubmit} className="encForm">
                            <input type="text" hidden name="document_type" value="foot_care_screening" />
                            <input type="text" hidden name="client_id" value={patient.client_id} />
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="fName" className="form-label">Client First Name</label>
                                    <input type="text" disabled className="form-control" value={patient.first_name} />
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col">
                                    <label htmlFor="lName" className="form-label">Client Last Name</label>
                                    <input type="text" disabled className="form-control" value={patient.last_name} />
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="date" className="form-label">Interaction Date: <span className="text-primary">*</span></label>
                                    <input value={date} type="date" className="form-control" onChange={(e) => setDate(e.target.value)} name="date" required />
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <div className="col-auto">
                                    <p>History of Diabetes or Peripheral Disease</p>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="visitType" name="visit_type" value={"yes"} />
                                        <label htmlFor="visitType" className="form-check-label">Yes</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="visitType" name="visit_type" value={"no"} />
                                        <label htmlFor="visitType" className="form-check-label">No</label>
                                    </div>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col-auto">
                                    <p>Current Leg or Feet Pain</p>
                                    <div className="mb-3">
                                        <div className="form-check form-check-inline">
                                            <input type="radio" className="form-check-input" id="visitLocation" name="Current_Pain" value={"Yes"} />
                                            <label htmlFor="visitLocation" className="form-check-label">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" className="form-check-input" id="visitLocation" name="Current_Pain" value={"No"} />
                                            <label htmlFor="visitLocation" className="form-check-label">No</label>
                                        </div>

                                    </div>
                                </div>

                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col mb-3">

                                    <label htmlFor="feet_concerns" className="form-label">Feet or Leg Concerns</label>
                                    <textarea className="form-control" name="feet_concerns" style={{ height: 100 }} ></textarea>

                                </div>
                            </div>

                            <hr />
                            <div className="row">
                                <div className="col-md-3 col-sm">
                                    <p>Taking Blood Thinning Medications</p>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="advDir" name="Taking_Blood_Thinners" value={"Yes"} />
                                        <label htmlFor="advDir" className="form-check-label">Yes</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="advDir" name="Taking_Blood_Thinners" value={"No"} />
                                        <label htmlFor="visitType" className="form-check-label">No</label>
                                    </div>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>

                                <div className="col-md-3 col-sm">
                                    <div className="d-flex align-items-center">
                                        <div className="me-2">Allergies:</div>
                                        <button className="btn btn-primary" type="button">Add</button>
                                    </div>

                                    <ul className="list-group-flush list-group">
                                        {patient.allergies ? patient.allergies.map(([n, r]) => <li className="fw-light list-group-item"><strong>{n}</strong><small>{r}</small></li>)
                                            : <li className="list-group-item fw-light">No Current Allergies</li>}
                                    </ul>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col-md-3 col-sm">
                                    <div className="d-flex align-items-center">
                                        <div className="me-2">Current Medications:</div>
                                        <button className="btn btn-primary" type="button">Add</button>
                                    </div>

                                    <ul className="list-group-flush list-group">
                                        {patient.medications ? patient.medications.map(([m, d, f]) => <li className="fw-light list-group-item"><strong>{m}</strong>, <em>{d}</em>, {f} </li>)
                                            : <li className="list-group-item fw-light">No Current Medications</li>}
                                    </ul>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-5 col-sm">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="me-4">Click to add Nursing Intervention Classifications</div>
                                        <NICTable setIntv={setSelectedInterventions} />
                                    </div>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col">
                                    <p className="text-decoration-underline fst-italic lh-1">Selected Interventions: </p>
                                    <ul className="list-group list-group-flush">
                                        {selectedInterventions.map(i => <li className="list-group-item text-success">{i}</li>)}
                                    </ul>
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <div className="col-auto px-5">
                                    <p>Smoker?</p>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="visitType" name="smoker" value={"yes"} />
                                        <label htmlFor="visitType" className="form-check-label">Yes</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="visitType" name="smoker" value={"no"} />
                                        <label htmlFor="visitType" className="form-check-label">No</label>
                                    </div>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col-auto px-5">
                                    <p>Shoes Fitting Appropriately</p>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="visitType" name="Shoes_Fit" value={"yes"} />
                                        <label htmlFor="visitType" className="form-check-label">Yes</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="visitType" name="Shoes_Fit" value={"no"} />
                                        <label htmlFor="visitType" className="form-check-label">No</label>
                                    </div>
                                </div>

                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col mb-3">
                                    <p>Pulses:</p>
                                    <div className="col">
                                        <div className="row">
                                            <label htmlFor="LDP" className="col-form-label col-sm-2">LDP:</label>
                                            <div className="col-sm-3">
                                                <input type="text" className="form-control" id="LDP" name="LPD" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="LDP" className="col-form-label col-sm-2">LPT:</label>
                                            <div className="col-sm-3">
                                                <input type="text" className="form-control" id="LPT" name="LPT" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <label htmlFor="LDP" className="col-form-label col-sm-2">RDP:</label>
                                            <div className="col-sm-3">
                                                <input type="text" className="form-control" id="RDP" name="RDP" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="LDP" className="col-form-label col-sm-2">RPT:</label>
                                            <div className="col-sm-3">
                                                <input type="text" className="form-control" id="RPT" name="RPT" />
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <label htmlFor="notes" className="form-label">Foot Malformations and Skin Conditions:</label>
                                <textarea className="form-control" name="notes" ></textarea>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <div className="col">
                                    <p>Self-Management Education</p>
                                    <div className="form-check form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="outcome1" value={"Preventative Foot Care"} name="Education" />
                                        <label htmlFor="outcome1" className="form-check-label">Preventative Foot Care</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="outcome2" value={"Tobacco Cessation"} name="Education" />
                                        <label htmlFor="outcome2" className="form-check-label">Tobacco Cessation</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="outcome3" value={"Diabetes Care"} name="Outcome" />
                                        <label htmlFor="outcome3" className="form-check-label">Diabetes Care</label>
                                    </div>

                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col-auto px-5">
                                    <p>Given New Socks:</p>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="visitType" name="Socks_Given" value={"yes"} />
                                        <label htmlFor="visitType" className="form-check-label">Yes</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="visitType" name="Socks_Given" value={"no"} />
                                        <label htmlFor="visitType" className="form-check-label">No</label>
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div className="row mb-3">
                                <div className="col">
                                    <p>Referral To:</p>
                                    <div className="form-check mb-3 form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="referral_to" name="Referral_to" value={"Health Care Provider"} />
                                        <label htmlFor="referral_to" className="form-check-label">To Health Care Provider</label>
                                    </div>
                                    <div className="form-check mb-3 form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="referral_to" name="Referral_to" value={"Assistance to Find a Provider"} />
                                        <label htmlFor="referral_to" className="form-check-label">Assistance to Find a Provider</label>
                                    </div>
                                    <div className="form-check mb-3 form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="referral_to" name="Referral_to" value={"Community Resource/Agency"} />
                                        <label htmlFor="referral_to" className="form-check-label">Community Resource/Agency</label>
                                    </div>
                                    <div className="form-check mb-3 form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="referral_to" name="Referral_to" value={"911/Urgent Care"} />
                                        <label htmlFor="referral_to" className="form-check-label">911/Urgent Care</label>
                                    </div>
                                </div>
                            </div>
                            <hr />





                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="good_catch" className="form-label">Good Catch?</label>
                                    <select className="form-select" id="good_catch" name="Good_Catch">
                                        <option selected disabled>Please Select</option>
                                        <option value={"Yes"}>Yes</option>
                                        <option value={"No"}>No</option>
                                    </select>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col">
                                    <label htmlFor="poss_ca" className="form-label">Possible CA/S</label>
                                    <select className="form-select" id="poss_ca" name="Possible_CA">
                                        <option selected disabled>Please Select</option>
                                        <option value={'Yes'}>Yes</option>
                                        <option value={'No'}>No</option>
                                    </select>
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="row mb-3">
                                        <label htmlFor="direct_time" className="form-label">Direct Time:</label>
                                        <select className="form-select" id="direct_time" name="direct_time" >
                                            <option selected disabled>Please Select</option>
                                            <option value={0.25} >15 min</option>
                                            <option value={0.5}>30 min</option>
                                            <option value={0.45}>45 min</option>
                                            <option value={1}>1 hour</option>
                                            <option value={1.5}>1 hour 30 min</option>
                                            <option value={2}>2 hours</option>
                                            <option value={2.5}>2 hours 30 min</option>
                                            <option value={3}>3 hours</option>
                                            <option value={3.5}>3 hours 30 min</option>
                                            <option value={4}>4 hours</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col">
                                    <div className="row mb-3">
                                        <label htmlFor="indirect_time" className="form-label">Indirect Time:</label>
                                        <select className="form-select" id="indirect_time" name="indirect_time" >
                                            <option selected disabled>Please Select</option>
                                            <option value={0.25} >15 min</option>
                                            <option value={0.5}>30 min</option>
                                            <option value={0.45}>45 min</option>
                                            <option value={1}>1 hour</option>
                                            <option value={1.5}>1 hour 30 min</option>
                                            <option value={2}>2 hours</option>
                                            <option value={2.5}>2 hours 30 min</option>
                                            <option value={3}>3 hours</option>
                                            <option value={3.5}>3 hours 30 min</option>
                                            <option value={4}>4 hours</option>
                                        </select>
                                    </div>

                                </div>

                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-lg" >Save and Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>


        </div>

    )
}