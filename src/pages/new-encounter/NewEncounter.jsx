import Topbar from "../../components/topbar/Topbar";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../components/userContext/userContext";
import fetchData from "../../components/functions/apiRequest";

export default function NewEncouter() {
    // const { state } = useLocation();
    // const { client } = state.client || {};
    const user = useContext(UserContext).user
    const [form, setForm] = useState({});

    const userInfo = {
        first_name: "user",
        last_name: "test_last",
        network_id: "00001",
        church_id: "0002"
    }

    const date = (theDate) => {
        const d = new Date(theDate)
        return d.toLocaleDateString();
    }

    async function getUserData() {
        let data = {
            operation: "get_user",
            payload: {
                username: user.username,
                include_list: [
                    "first_name",
                    "last_name",
                    "network_id",
                    "church_id"
                ]

            }

        }

        const res = await fetchData('POST', data)

        if (res['body']['success']) {
            const userInf = res['body']['user']

        }

    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value })
        //setClient(values => ({ ...values, [name]: value }));

    };

    async function handleSubmit(e) {
        e.prventDefault();

    }

    return (
        <>
            <div className="containter bg-light vh-100">
                <Topbar />
                <div className="d-flex">
                    <div className="container-fluid mt-4 px-4">
                        <div className="container-fluid mb-4 text-center d-flex justify-content-between">
                            <button className="btn btn-outline-primary">Back to Client Profile</button>
                            <h1 className="display-6 text-primary">New Encounter</h1>
                            <button className="btn btn-primary">Save and Submit</button>
                        </div>
                        <fieldset>
                            <legend>User Information</legend>
                            <div className="row">
                                <label htmlFor="staticUserFirstName" className="col-sm-4 col-form-label">Your First name:</label>
                                <div className="col-sm-8">
                                    <input type="text" readonly className="form-control-plaintext" id="staticUserFirstName" value={userInfo.first_name} />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="staticUserLastName" className="col-sm-4 col-form-label">Your Last name:</label>
                                <div className="col-sm-8">
                                    <input type="text" readonly className="form-control-plaintext" id="staticLastName" value={userInfo.last_name} />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="staticUserChurchID" className="col-sm-4 col-form-label">Church Id:</label>
                                <div className="col-sm-8">
                                    <input type="text" readonly className="form-control-plaintext" id="staticUserChurchID" value={userInfo.church_id} />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="staticUserNetworkID" className="col-sm-4 col-form-label">Network Id:</label>
                                <div className="col-sm-8">
                                    <input type="text" readonly className="form-control-plaintext" id="staticUserNetworkID" value={userInfo.network_id} />
                                </div>
                            </div>
                        </fieldset>
                        <div className="container card bg-white">
                            <hr></hr>
                            <h3>Interaction</h3>
                            <form action="POST" onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Encounter Date:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        onChange={handleChange}
                                        name="date"
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="visit_type" className="form-label">Visit Type</label>
                                    <select className="form-select"
                                        value={form.visit_type}
                                        onChange={handleChange}
                                        id="visit_type"
                                        name="visit_type"
                                    >
                                        <option selected>Initial Vistit</option>
                                        <option>Follow Up Visit</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Location of Visit</label>
                                    <select className="form-select"
                                        value={form.visit_type}
                                        onChange={handleChange}
                                        id="location"
                                        name="location"
                                    >
                                        <option selected disabled>Select...</option>
                                        <option>Church</option>
                                        <option>Home</option>
                                        <option>Hospital</option>
                                        <option>Office</option>
                                        <option>Phone</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="direct_time" className="form-label">Direct Time:</label>
                                    <select className="form-select"
                                        value={form.direct_time}
                                        onChange={handleChange}
                                        id="direct_time"
                                        name="direct_time" >

                                        <option selected default>Select...</option>
                                        <option >15 min</option>
                                        <option>30 min</option>
                                        <option>45 min</option>
                                        <option>1 hour</option>
                                        <option>1 hour 30 min</option>
                                        <option>2 hours</option>
                                        <option>2 hours 30 min</option>
                                        <option>3 hours</option>
                                        <option>3 hours 30 min</option>
                                        <option>4 hours</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="indirect_time" className="form-label">Indirect Time:</label>
                                    <select className="form-select"
                                        value={form.indirect_time}
                                        onChange={handleChange}
                                        id="indirect_time"
                                        name="indirect_time" >

                                        <option selected>15 min</option>
                                        <option>30 min</option>
                                        <option>45 min</option>
                                        <option>1 hour</option>
                                        <option>1 hour 30 min</option>
                                        <option>2 hours</option>
                                        <option>2 hours 30 min</option>
                                        <option>3 hours</option>
                                        <option>3 hours 30 min</option>
                                        <option>4 hours</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="concerns" className="form-label">Client Health/Wellness Concerns</label>
                                    <textarea className="form-control"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nursing_intervention" className="form-label"></label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}