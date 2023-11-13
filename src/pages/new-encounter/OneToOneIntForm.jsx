import { useContext, useState } from "react";
import UserContext from "../../components/userContext/userContext";
import fetchData from "../../components/functions/apiRequest";
export default function OneToOneIntForm(initform) {
    const user = useContext(UserContext).user
    const [form, setForm] = useState({});
    const init = initform.initform

    const date = (theDate) => {
        const d = new Date(theDate)
        return d.toLocaleDateString();
    }


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value })
        //setClient(values => ({ ...values, [name]: value }));

    };

    async function handleSubmit(e) {
        e.preventDefault();

        setForm({ ...init, ...form })
        console.log(init)
        console.log(form)
        console.log(init.client_id)



        const data = {
            operation: "create_document",
            payload: {
                username: user.username,
                token: user.token,
                document_info: form
            }
        }
        console.log(data)
        const res = await fetchData("POST", data)
        console.log(res)
        if (res['body']['success']) {
            console.log("success")
            //navigate()
        }
    }


    return (

        <div className="container card bg-white">
            <hr></hr>
            <h3>Interaction</h3>
            <form action="POST" onSubmit={handleSubmit}>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="date" className="form-label">Interaction Date:</label>
                        <input
                            value={form.date}
                            type="date"
                            className="form-control"
                            onChange={handleChange}
                            name="date"
                            required />

                    </div>
                    <div className="col">
                        <label htmlFor="visit_type" className="form-label">Visit Type</label>
                        <select className="form-select"
                            value={form.visit_type}
                            onChange={handleChange}
                            id="visit_type"
                            name="visit_type"
                        >
                            <option selected disabled>Please Select</option>
                            <option>Initial Vistit</option>
                            <option>Follow Up Visit</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="location" className="form-label">Location of Visit</label>
                        <select className="form-select"
                            value={form.location}
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
                </div>
                <div className="row mb-3">
                    <div className="col">

                        <label htmlFor="direct_time" className="form-label">Direct Time:</label>
                        <select className="form-select"
                            value={form.direct_time}
                            onChange={handleChange}
                            id="direct_time"
                            name="direct_time" >

                            <option selected disabled>Please Select</option>
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
                    <div className="col">
                        <label htmlFor="indirect_time" className="form-label">Indirect Time:</label>
                        <select className="form-select"
                            value={form.indirect_time}
                            onChange={handleChange}
                            id="indirect_time"
                            name="indirect_time" >
                            <option selected disabled>Please Select</option>
                            <option>15 min</option>
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
                </div>
                <div className="mb-3">
                    <label htmlFor="concerns" className="form-label">Client Health/Wellness Concerns</label>
                    <textarea className="form-control"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="nursing_intervention" className="form-label">Nursing Intervention Classification</label>
                    <select className="form-select"
                        value={form.nursing_intervention}
                        onChange={handleChange}
                        id="nursing_intervention"
                        name="nursing_intervention" >

                        <option selected disabled>Please Select...</option>
                        <option>Surveillance</option>
                        <option>Spiritual support</option>
                        <option>Admission care</option>
                        <option>Medication management</option>
                        <option>Emotional support</option>
                        <option>Referral</option>
                        <option>Vital sign monitoring</option>
                        <option>Financial resource assistance</option>
                        <option>Coping enhancement</option>
                        <option>Support system enhancement</option>
                        <option>Health system guidance</option>
                        <option>Active listening</option>
                        <option>Telephone consultation</option>
                        <option>Circulatory care: venous insufficiency</option>
                        <option>Grief work facilitation</option>
                        <option>Presence</option>
                        <option>Multidisciplinary care conference</option>
                        <option>Religious ritual enhancement</option>
                        <option>Caregiver support</option>
                        <option>Oxygen therapy</option>
                        <option>Risk identification</option>
                        <option>Dying care</option>
                        <option> Family support</option>
                        <option>Teaching: prescribed medication</option>
                        <option>Healthcare information exchange</option>
                        <option>Decision-making support</option>
                        <option>Home maintenance assistance</option>
                        <option>Wound care</option>
                        <option>Abuse protection support: domestic partner</option>
                        <option>Patient rights protection</option>
                        <option>Technology management</option>
                        <option>Pain management</option>

                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="notes" className="form-label">Notes</label>
                    <textarea className="form-control" value={form.notes} name="notes" onChange={handleChange}></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="ref_to" className="form-label">Outcomes</label>
                    <select className="form-select"
                        value={form.outcomes}
                        onChange={handleChange}
                        id="ref_to"
                        name="ref_to" >
                        <option selected disabled>Please Select</option>
                        <option>Impoved health status</option>
                        <option>Access to care/ resources</option>
                        <option>Enhanced independent living</option>
                        <option>injury prevention</option>
                        <option>knowledge Increase</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="ref_to" className="form-label">Referral</label>
                    <select className="form-select"
                        value={form.ref_to}
                        onChange={handleChange}
                        id="ref_to"
                        name="ref_to" >
                        <option selected disabled>Please Select</option>
                        <option>To Health Care Provider</option>
                        <option>Assistance to Find a Provider</option>
                        <option>Community Resource/Agency</option>
                        <option>911/Urgent Care</option>
                    </select>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="good_catch" className="form-label">Good Catch?</label>
                        <select className="form-select"
                            value={form.good_catch}
                            onChange={handleChange}
                            id="good_catch"
                            name="good_catch"
                        >
                            <option selected disabled>Please Select</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="poss_ca" className="form-label">Possible CA/S</label>
                        <select className="form-select"
                            value={form.poss_ca}
                            onChange={handleChange}
                            id="poss_ca"
                            name="poss_ca"
                        >
                            <option selected disabled>Please Select</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>

                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </div>

            </form>
        </div>

    )
}