import "bootstrap/js/dist/modal";
import { useState } from 'react';
import UserContext from "../userContext/userContext";
import { useContext } from "react";
import fetchData from "../functions/apiRequest";
import { useNavigate } from "react-router-dom";

export default function NewClientForm() {

    const [client, setClient] = useState({});
    const [age, setAge] = useState('');
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
        console.log(races)
        client['race'] = races

    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setClient({ ...client, [name]: value })
        //setClient(values => ({ ...values, [name]: value }));

    };
    async function handleSubmit(e) {
        e.preventDefault();

        console.log(client)

        const data = {
            operation: "create_client",
            payload: {
                username: user.username,
                token: user.token,
                client_info: client
            }
        }

        const res = await fetchData("POST", data)
        console.log(res)
        if (res['body']['success']) {
            console.log("success")
            nav("/client", { state: { client: { client } } })
        }

    };

    return (
        <div>
            <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#form">Add New Client</button>
            <div className="modal fade" id="form"
                tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-centered-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add New Client</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="POST" onSubmit={handleSubmit}>
                                {/* first row */}
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            {/* first name */}
                                            <input
                                                type="text" className="form-control"
                                                value={client.first_name}
                                                onChange={handleChange}
                                                id="first_name"
                                                name="first_name"
                                                placeholder='First Name'
                                                required
                                            />
                                            <label htmlFor="floatingInput">First Name</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            {/* last name */}
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={client.last_name}
                                                onChange={handleChange}
                                                id="last_name"
                                                name="last_name"
                                                placeholder='Last Name'
                                                required
                                            />
                                            <label htmlFor="floatingInput">Last Name</label>
                                        </div>
                                    </div>
                                    {/* second row */}
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="form-floating mb-3">
                                                {/* dob */}
                                                <input
                                                    type="date"
                                                    className="form-control form-control"
                                                    value={client.dob}
                                                    onChange={handleDateChange}
                                                    id="dob"
                                                    name="dob"
                                                    placeholder='Date of Birth'
                                                    max={new Date().toLocaleDateString("fr-ca")}
                                                    required
                                                />
                                                <label htmlFor="floatingInput">Date of Birth</label>
                                            </div>
                                        </div>
                                        {/* age */}
                                        <div className="col">
                                            <p>Age: {age} </p>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                {/* gender selection */}
                                                <select
                                                    className="form-select"
                                                    value={client.gender}
                                                    onChange={handleChange}
                                                    id="gender"
                                                    name="gender"
                                                    placeholder='Gender'
                                                >
                                                    <option selected disabled>Please select...</option>
                                                    <option>Female</option>
                                                    <option>Male</option>
                                                </select>
                                                <label htmlFor="floatingInput">Gender</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* third row */}

                                {/* race */}
                                <div className=" row mb-3 d-flex justify-content-between">
                                    <div className="col-md-1">
                                        <h6 className="fs-5 fst-italic">Race</h6>
                                    </div>
                                    {/* race checkboxes */}
                                    <div className="col">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                defaultChecked={false}
                                                value="AN"
                                                onChange={handlerace}
                                                type="checkbox"
                                                id="race1"
                                                name="race"
                                                placeholder="Race" />
                                            <label className="form-check-label" htmlFor="race1">American Indian or Alaska Native</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                defaultChecked={false}
                                                value="AS"
                                                onChange={handlerace}
                                                type="checkbox"
                                                id="race2"
                                                name="race"
                                                placeholder="Race" />
                                            <label className="form-check-label" htmlFor="race2">Asian</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                defaultChecked={false}
                                                value="AA"
                                                onChange={handlerace}
                                                type="checkbox"
                                                id="race3"
                                                name="race"
                                                placeholder="Race" />
                                            <label className="form-check-label" htmlFor="race3">Black or African American</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                defaultChecked={false}
                                                value="PI"
                                                onChange={handlerace}
                                                type="checkbox"
                                                id="race4"
                                                name="race"
                                                placeholder="Race" />
                                            <label className="form-check-label" htmlFor="race4">Native Hawaiian or Other Pacific Islander</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                defaultChecked={false}
                                                value="WH"
                                                onChange={handlerace}
                                                type="checkbox"
                                                id="race5"
                                                name="race"
                                                placeholder="Race" />
                                            <label className="form-check-label" htmlFor="race5">White</label>
                                        </div></div>

                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            {/* ethnicity selection */}
                                            <select
                                                className="form-select"
                                                value={client.ethnicity}
                                                onChange={handleChange}
                                                id="ethnicity"
                                                name="ethnicity"
                                                placeholder='Ethnicity'
                                            >
                                                <option selected disabled>Please Select...</option>
                                                <option>Hispanic or Latino</option>
                                                <option>Not Hispanic or Latino</option>
                                            </select>
                                            <label htmlFor="floatingInput">Ethnicity</label>
                                        </div>
                                    </div>
                                </div>

                                {/* fourth row */}
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        value={client.address}
                                        onChange={handleChange}
                                        className="form-control form-control"
                                        id="address"
                                        name="address"
                                        placeholder='Street Address'
                                    />
                                    <label htmlFor="floatingInput">Address</label>
                                </div>
                                {/* row 5 */}
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control form-control"
                                                value={client.city}
                                                onChange={handleChange}
                                                id="city"
                                                name="city"
                                                placeholder='city'
                                            />
                                            <label htmlFor="floatingInput">City</label>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control form-control"
                                                value={client.state}
                                                onChange={handleChange}
                                                id="state"
                                                name="state"
                                                placeholder='State'
                                            />
                                            <label htmlFor="floatingInput">State</label>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control form-control"
                                                value={client.zip}
                                                onChange={handleChange}
                                                id="zip"
                                                name="zip"
                                                placeholder='Zip'
                                                pattern="^\d{5}(?:[-\s]\d{4})?$"
                                            />
                                            <label htmlFor="floatingInput">Zip</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="tel"
                                                className="form-control form-control"
                                                value={client.phone_number}
                                                onChange={handleChange}
                                                id="phone"
                                                name="phone"
                                                placeholder='Phone Number'
                                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                            />
                                            <label htmlFor="floatingInput">Phone Number</label>
                                        </div>
                                    </div>
                                </div>
                                {/* row 6 */}
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="email"
                                                value={client.email}
                                                onChange={handleChange}
                                                className="form-control form-control"
                                                id="email"
                                                name="email"
                                                placeholder='Email Address'
                                            />
                                            <label htmlFor="floatingInput">Email Address</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                value={client.occupation}
                                                onChange={handleChange}
                                                className="form-control form-control"
                                                id="occupation"
                                                name="occupation"
                                                placeholder="Occupation"
                                            />
                                            <label htmlFor="floatingInput">Occupation</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            {/* last name */}
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={client.insurance}
                                                onChange={handleChange}
                                                id="insurance"
                                                name="insurance"
                                                placeholder='Insurance'
                                            />
                                            <label htmlFor="floatingInput">Insurance</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            {/* first name */}
                                            <select
                                                className="form-select"
                                                value={client.referral}
                                                onChange={handleChange}
                                                id="referral"
                                                name="referral"
                                                placeholder='Referred From'
                                                required
                                            >
                                                <option selected disabled>Please Select...</option>
                                                <option>Self</option>
                                                <option>Family Member</option>
                                                <option>Pastoral Staff</option>
                                                <option>Physician</option>
                                                <option>Community</option>
                                                <option>Other</option>
                                            </select>
                                            <label htmlFor="floatingInput">Referral From: </label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            {/* first name */}
                                            <select
                                                className="form-select"
                                                value={client.private}
                                                onChange={handleChange}
                                                id="private"
                                                name="private"
                                                placeholder='private'
                                                required
                                            >
                                                <option selected disabled>Keep Client Information Private?</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                            <label htmlFor="floatingInput">Private?</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea className="form-control"
                                        placeholder="Leave additional comments here."
                                        style={{ height: 75 }}
                                    />
                                    <label htmlFor="floatingInput">Leave additional comments here.</label>
                                </div>
                                <div className="d-flex justify-item-center">
                                    <button type="submit" className="btn btn-primary" >Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}