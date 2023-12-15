import { useContext, useState } from "react";
import NICTable from "../Tables/NICTable";
import UserContext from "../userContext/userContext";
import fetchData from "../functions/apiRequest";
export default function BloodPressureForm(props) {
    const patient = props.patient
    const [education, setEducation] = useState("")
    const user = useContext(UserContext).user
    let [selectedInterventions, setSelectedInterventions] = useState([])

    const [date, setDate] = useState(() => {
        const now = new Date().toLocaleDateString('en-CA');
        return now;
    })

    const [time, setTime] = useState(() => {
        const t = new Date().toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" })
        return t;
    })

    const otherEducation = (
        <div className="">
            <label htmlFor="otherEdu" className="form-label">Education:</label>
            <input type="text" className="form-control mb-3" id="otherEdu" name="Education_Given" required />
        </div>
    )
    const meds = [['med1', '3mg', 'tid'], ['med2', '7mg', 'daily']]

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const medEdu = formData.getAll("Medication_Education")
        const edu = formData.getAll("Education_Given")
        const ref = formData.getAll("Referral_to")
        const intv = formData.getAll("Interventions")
        formData.append('Medication_Education', medEdu)
        formData.append('Education_Given', medEdu)
        formData.append("Referral_to", ref)
        formData.append("Interventions", intv)

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
        const res = await fetchData("POST", data)
        console.log(res)
        if (res['body']['success']) {
            console.log("success")
            props.setMessage("Success")
        }

    }


    return (

        <div className="container">
            <div className="card bg-white mb-5">
                <h4 className="card-title mt-3 text-center">Individual Blood Pressure Screening</h4>
                <hr></hr>
                <div className="card-body">
                    <div className="p-4 py-0">
                        <form action="POST" onSubmit={handleSubmit}>
                            <input type="text" hidden name="document_type" value="blood_pressure_screening" />
                            <input type="text" hidden name="client_id" value={patient.patient.client_id} />
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="fName" className="form-label">Patient First Name</label>
                                    <input type="text" disabled className="form-control" value={patient.patient.first_name} />
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col">
                                    <label htmlFor="lName" className="form-label">Patient Last Name</label>
                                    <input type="text" disabled className="form-control" value={patient.patient.last_name} />
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-3 ">
                                {/* Interaction Date */}
                                <div className="col">
                                    <label htmlFor="date" className="form-label">Interaction Date:</label>
                                    <input type="date" className="form-control" onChange={(e) => { setDate(e.target.value) }} name="date" value={date} required />
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col">
                                    <label htmlFor="time" className="form-label">Interaction Time:</label>
                                    <input type="time" className="form-control" name="time" value={time} onChange={(e) => {
                                        setTime(e.target.value)
                                        console.log(time)
                                    }} />
                                </div>
                            </div>

                            <hr />
                            <h5 className="lead">Blood Pressure</h5>
                            <hr />
                            <div className="row mb-3 ">
                                {/* Bp screening */}
                                <div className="col-lg-3 col-sm-6">
                                    <div className="row mb-3">
                                        <label htmlFor="systolic" className="form-label">Systolic</label>
                                        <input type="number" className="form-control" id="systolic" name="systolic" min='0' max='250' required />
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="diastolic" className="form-label">Diastolic</label>
                                        <input type="number" className="form-control" id="diastolic" name="diastolic" min='0' max='250' required />
                                    </div>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col-auto">
                                    <p className="">Arm</p>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" name="Arm" value={"left_arm"} />
                                        <label htmlFor="arm" className="form-check-label">Left Arm</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" name="Arm" value={"right_arm"} />
                                        <label htmlFor="arm" className="form-check-label">Right Arm</label>
                                    </div>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col-auto">
                                    <p>BP Category</p>
                                    <div className="form-check form-check-inline mb-3">
                                        <input type="radio" className="form-check-input" id="bpCat" name="BP_category" value={"Normal"} />
                                        <label htmlFor="bpCat" className="form-check-label">Normal</label>
                                    </div>
                                    <div className="form-check form-check-inline mb-3">
                                        <input type="radio" className="form-check-input" id="bpCat" name="BP_category" value={"Elevated"} />
                                        <label htmlFor="bpCat" className="form-check-label">Elevated</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="bpCat" name="BP_category" value={"HTN_1"} />
                                        <label htmlFor="bpCat" className="form-check-label">Hypertension Stage I</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="bpCat" name="BP_category" value={"HTN_2"} />
                                        <label htmlFor="bpCat" className="form-check-label">Hypertension Stage II</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="bpCat" name="BP_category" value={"HTN_crisis"} />
                                        <label htmlFor="bpCat" className="form-check-label">Hypetensive Crisis</label>
                                    </div>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col">
                                    <label htmlFor="bp_comments" className="form-label">Blood Pressure Concerns or Recommendations:</label>
                                    <textarea className="form-control" name="bp_comments" id="bp_comments" style={{ height: 150 }}></textarea>
                                </div>
                            </div>

                            <hr />
                            <h5 className="lead">Participant Record</h5>
                            <hr />

                            {/* Type of Screening */}
                            <div className="row mb-3">
                                <div className="col-md-3 col-sm-6">
                                    <p>Type of Screening</p>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="bpType" name="type_of_screening" value={"initial"} />
                                        <label htmlFor="bpType" className="form-check-label">Initial Screening</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="bpType" name="type_of_screening" value={"follow up"} />
                                        <label htmlFor="bpType" className="form-check-label">Follow Up Screening</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="bpType" name="type_of_screening" value={"Phys Follow Up"} />
                                        <label htmlFor="bpType" className="form-check-label">Follow Up from Physician</label>
                                    </div>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col-sm-6 col-md-auto">
                                    <p>First Time Blood Pressure Screen at Church?</p>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="firstScreen" name="first_screen" value={"Yes"} />
                                        <label htmlFor="firstScreen" className="form-check-label">Yes</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="firstScreen" name="first_screen" value={"No"} />
                                        <label htmlFor="firstScreen" className="form-check-label">No</label>
                                    </div>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col-sm-6 col-md-auto">
                                    <label htmlFor="last_time" className="form-label">Date of Last Blood Pressure</label>
                                    <input id="last_time" type="date" className="form-control" />
                                </div>
                            </div>

                            <hr />

                            <div className="row mb-3">
                                <div className="col-md-7 col-sm-6 mb-3 mb-lg-0">
                                    <label htmlFor="history" className="form-label">Brief History</label>
                                    <textarea className="form-control" name="history" id="history" style={{ height: "100px" }}></textarea>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col-md-4 col-sm-6 ">
                                    <p>History of Diabetes or Pre-Diabetic?</p>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="diabetesHist" name="Diabetes_History" value={"Yes"} />
                                        <label htmlFor="diabetesHist" className="form-check-label">Yes</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="diabetesHist" name="Diabetes_History" value={"No"} />
                                        <label htmlFor="diabetesHist" className="form-check-label">No</label>
                                    </div>
                                </div>
                            </div>

                            <hr />






                            <div className="row mb-3">
                                <div className="col-3">
                                    <p>Current Medications:</p>
                                    <ul className="list-group-flush list-group">
                                        {patient.patient.medications ? patient.patient.medications.map(([m, d, f]) => <li className="fw-light list-group-item"><strong>{m}</strong>, <em>{d}</em>, {f} </li>)
                                            : <li className="list-group-item fw-light">No Current Medications</li>}
                                    </ul>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col-auto">
                                    <p>New or Changed Medications?</p>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="newMeds" name="new_meds" value={"Yes"} />
                                        <label htmlFor="newMeds" className="form-check-label">Yes</label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input type="radio" className="form-check-input" id="newMeds" name="new_meds" value={"No"} />
                                        <label htmlFor="newMeds" className="form-check-label">No</label>
                                    </div>
                                </div>
                                <div className="vr p-0 mx-4 d-none d-md-block"></div>
                                <div className="col">
                                    <div className="row mb-3">
                                        <p>Medication Education Given</p>
                                        <div className="form-check mb-3">
                                            <input type="checkbox" className="form-check-input" id="medEdu" name="Medication_Education" value={"Action"} />
                                            <label htmlFor="medEdu" className="form-check-label">Action</label>
                                        </div>
                                        <div className="form-check mb-3">
                                            <input type="checkbox" className="form-check-input" id="medEdu" name="Medication_Education" value={"Side Effects"} />
                                            <label htmlFor="medEdu" className="form-check-label">Side Effects</label>
                                        </div>
                                        <div className="form-check mb-3">
                                            <input type="checkbox" className="form-check-input" id="medEdu" name="Medication_Education" value={"Precautions"} />
                                            <label htmlFor="medEdu" className="form-check-label">Precautions</label>
                                        </div>
                                        <div className="form-check mb-3">
                                            <input type="checkbox" className="form-check-input" id="medEdu" name="Medication_Education" value={"Med Card Given"} />
                                            <label htmlFor="medEdu" className="form-check-label">Medication Card Provided</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-auto">
                                    <p>Education Given:</p>
                                    <div className="mb-3">
                                        <div className="form-check form-check-inline">
                                            <input type="checkbox" className="form-check-input" id="eduGiven" name="Education_Given" value="BP" />
                                            <label htmlFor="eduGiven" className="form-check-label">Blood Pressure</label>
                                        </div>
                                        <div className="form-check  form-check-inline">
                                            <input type="checkbox" className="form-check-input" id="eduGiven" name="Education_Given" value="Diabetes" />
                                            <label htmlFor="eduGiven" className="form-check-label">Diabetes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="checkbox" className="form-check-input" id="eduGiven" name="Education_Given" value="Nutrition" />
                                            <label htmlFor="eduGiven" className="form-check-label">Nutrition</label>
                                        </div><div className="form-check form-check-inline">
                                            <input type="checkbox" className="form-check-input" id="eduGiven" name="Education_Given" value="Exercise" />
                                            <label htmlFor="eduGiven" className="form-check-label">Exercise</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="checkbox" className="form-check-input" id="eduGiven" name="Education_Given" value="Stress" />
                                            <label htmlFor="eduGiven" className="form-check-label">Stress Management</label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check form-check-inline">
                                            <input type="checkbox" className="form-check-input" id="eduGiven" name="Education_Given" value="Smoking" />
                                            <label htmlFor="eduGiven" className="form-check-label">Smoking Cessation</label>
                                        </div><div className="form-check form-check-inline">
                                            <input type="checkbox" className="form-check-input" id="eduGiven" name="Education_Given" value="Weight" />
                                            <label htmlFor="eduGiven" className="form-check-label">Weight Control</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="checkbox" className="form-check-input" id="eduGiven" name="Education_Given" value="Other" onChange={(e) => setEducation(e.target.checked)} />
                                            <label htmlFor="eduGiven" className="form-check-label">Other</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">{education ? otherEducation : ""}</div>
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

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-lg" >Save and Submit</button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>


            {/* last bp from screening */}

        </div>
    )
}