import "bootstrap/js/dist/modal";
import { useState } from 'react';
import UserContext from "../userContext/userContext";
import { useContext } from "react";
import fetchData from "../functions/apiRequest";
import { useNavigate } from "react-router-dom";

export default function NewClientForm() {

    const [client, setClient] = useState({});
    const [age, setAge] = useState('');
    const [selectedImage, setSelectedImage] = useState(null)
    const nav = useNavigate();
    let races = [];
    const user = useContext(UserContext).user

    const handleDateChange = (e) => {
        handleChange(e);
        const thisYear = new Date().getFullYear();
        const dob = new Date(e.target.value)
        setAge(thisYear - dob.getFullYear())
    }

    const handlerace = (e) => {
        const value = e.target.value
        if (e.target.checked) {
            races.push(value)
        } else {
            const raceIndex = races.findIndex((v) => v === value)
            races.splice(raceIndex, 1)
        }

    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // setClient({ ...client, [name]: value })
        //setClient(values => ({ ...values, [name]: value }));
        console.log(name, value)

    };
    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const r = formData.getAll('race')
        console.log(r)
        formData.delete('race')
        formData.append("race", r)
        formData.append('age', age)

        let f = {}
        formData.forEach((value, key) => f[key] = value)
        const fJson = JSON.stringify(f)

        const data = {
            operation: "create_client",
            payload: {
                username: user.username,
                token: user.token,
                client_info: f
            }
        }

        console.log(data.payload.client_info)

        const res = await fetchData("POST", data)
        console.log(res)
        if (res['body']['success']) {
            console.log("success")
            nav("/client", { state: { client: { client } } })
        }

    };

    return (
        <div>
            <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#form">
                <i class="bi bi-person-plus-fill d-none d-lg-inline"></i>
                <p className="d-none d-lg-inline">New Client</p>
                <i class="bi bi-person-plus-fill d-lg-none" style={{ fontSize: "2rem" }}></i>
            </button>
            <div className="modal fade" id="form" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="staticBackdropLabel">New Client Form</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="">
                                    <h6 className="fst-italic mb-2 fw-light">Please complete form with as much information as possible.</h6>
                                </div>
                                <form action="POST" onSubmit={handleSubmit} id="newClientForm" autoComplete="off">
                                    <div className="row">
                                        <div className="col-auto mb-3">
                                            <div className="d-flex justify-content-center mb-2">
                                                {selectedImage ? <img className="border border-2 border-black rounded-circle object-fit-cover" alt="not found" width={"125px"} height={"125px"} src={URL.createObjectURL(selectedImage)} />
                                                    : <span><i className="bi bi-person-circle lh-1 text-body-tertiary opacity-25" style={{ fontSize: "125px", fontWeight: "200" }}></i></span>
                                                }
                                            </div>
                                            <div className="d-flex mb-3 justify-content-center">
                                                <div className="btn btn-outline-primary btn-rounded">
                                                    <label htmlFor="clientPhoto">CHOOSE FILE</label>
                                                    <input
                                                        className=" form-control d-none"
                                                        id="clientPhoto"
                                                        type="file"
                                                        name="myImage"
                                                        onChange={(event) => {
                                                            console.log(event.target.files[0]);
                                                            setSelectedImage(event.target.files[0]);
                                                            console.log(URL.createObjectURL(selectedImage))
                                                            console.log(selectedImage)
                                                        }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label htmlFor="firstName" className="form-label">First Name <span className="text-primary">*</span></label>
                                                    <input type="text" className="form-control" id="firstName" name="first_name" required />
                                                </div>
                                                <div className="col mb-3">
                                                    <label htmlFor="lastName" className="form-label">Last Name <span className="text-primary">*</span></label>
                                                    <input type="text" className="form-control" id="lastName" name="last_name" required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-5 mb-3">
                                                    <label htmlFor="dob" className="form-label">Date of Birth: <span className="text-primary">*</span></label>
                                                    <input type="date" className="form-control" id="dob" name="dob" onChange={handleDateChange} required max={new Date().toLocaleDateString("fr-ca")} />
                                                </div>
                                                <div className="col-lg-1 mb-3">
                                                    <label htmlFor="age" className="form-label">Age:</label>
                                                    <input type="text" readOnly className="form-control-plaintext" value={age} />
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="gender" className="form-label">Gender:</label>
                                                    <select name="gender" id="gender" className="form-select">
                                                        <option value="undisclosed">Prefer not to disclose</option>
                                                        <option value="female">Female</option>
                                                        <option value="male">Male</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row mb-3">
                                        <div className="col">
                                            <p>Race: </p>
                                            <div className="form-check form-check-inline">
                                                <input type="checkbox" className="form-check-input" id="race1" value={"AN"} name="race" />
                                                <label htmlFor="race1" className="form-check-label">American Indian or Alaska Native</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input type="checkbox" className="form-check-input" id="race2" value={"AS"} name="race" />
                                                <label htmlFor="race2" className="form-check-label">Asian</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input type="checkbox" className="form-check-input" id="race3" value={"AA"} name="race" />
                                                <label htmlFor="race3" className="form-check-label">Black or African American</label>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-check form-check-inline">
                                                        <input type="checkbox" className="form-check-input" id="race4" value={"PI"} name="race" />
                                                        <label htmlFor="race4" className="form-check-label">Native Hawaiian or Other Pacific Islander</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input type="checkbox" className="form-check-input" id="race5" value={"WH"} name="race" />
                                                        <label htmlFor="race5" className="form-check-label">White</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input type="checkbox" className="form-check-input" id="race6" value={"NA"} name="race" />
                                                        <label htmlFor="race6" className="form-check-label">Prefer not to disclose</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col">
                                        <label htmlFor="ethnicity" className="form-label">Ethnicity: </label>
                                        <select name="ethnicity" id="ethnicity" className="form-select">
                                            <option>Hispanic or Latino</option>
                                            <option>Not Hispanic or Latino</option>
                                        </select>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col mb-3">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <input type="text" className="form-control" id="address" name="address" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input type="text" className="form-control" id="city" name="city" />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="state" className="form-label">State</label>
                                            <input type="text" className="form-control" id="state" name="state" />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="zip" className="form-label">Zip Code</label>
                                            <input type="number" className="form-control" name="zip" id="zip" pattern="\d{5}(?:[\s\-]\d{4})?" />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="phone" className="form-label">Phone</label>
                                            <input type="tel" className="form-control" name="phone" id="phone" pattern="(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="email" className="form-label">Email Address</label>
                                            <input type="email" className="form-control" id="email" name="email" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="occupation" className="form-label">Occupation</label>
                                            <input type="text" className="form-control" id="occupation" name="occupation" />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="insurance" className="form-label">Insurance</label>
                                            <input type="text" id="insurance" name="insurance" className="form-control" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="refferal" className="form-label">Referred From:</label>
                                            <select name="referral" id="referall" className="form-select">
                                                <option value="Self">Self</option>
                                                <option value="Family">Family Member</option>
                                                <option value="Pastoral_Staff">Pastoral Staff</option>
                                                <option value="physician">Physician</option>
                                                <option value="community">Community</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="emContact" className="form-label">Emergency Contact Name</label>
                                            <input type="text" id="emContact" name="emergency_contact" className="form-control" />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="emContactPhone" className="form-label">Emergency Contact Phone:</label>
                                            <input type="tel" id="emContactPhone" name="emergency_phone_number" className="form-control" pattern="(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}" />
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" data-bs-dismiss="modal" className="btn btn-secondary">Close without Saving</button>
                            <button type="submit" form="newClientForm" className="btn btn-primary">Save and Submit</button>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    )
}