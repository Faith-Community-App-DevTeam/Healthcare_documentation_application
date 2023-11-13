import { useState } from "react";
export default function BloodPressureForm() {

    const [form, setForm] = useState({});


    const date = (theDate) => {
        const d = new Date(theDate)
        return d.toLocaleDateString();
    }

    //FIXME
    //might need this for date picking
    //const DatePicker = () => {
    //    const [date, setDate] = useState('');
    //    const dateInputRef = useRef(null);

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

        <div className="container card bg-white">
            <hr></hr>
            <h3>Blood Pressure</h3>
            <form action="POST" onSubmit={handleSubmit}>

                <div className="row mb-3">
                    <div className='col'>
                        <label htmlFor="initials" className="form-label">Initials</label>
                        <textarea className="form-control"></textarea>
                    </div>
                    <div className="col">
                        <label htmlFor="first_time" className="form-label">First time blood screen at church?:</label>
                        <select className="form-select"
                            value={form.first_time}
                            onChange={handleChange}
                            id="first_time"
                            name="first_time"
                        >
                            <option selected disabled>Please Select</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="last_time" className="form-label">If first Blood Screen as church, when was the last time prior to this bp?:</label>
                        <input type="date" onChange={handleChange} ref={dateInputRef}/>
                        <p>Selected Date: {date}</p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="follow_up" className="form-label">Is this a follow up BP at church?:</label>
                        <select className="form-select"
                            value={form.follow_up}
                            onChange={handleChange}
                            id="follow_up"
                            name="follow_up" >

                            <option selected disabled>Please Select</option>
                            <option >Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="diabetic_hx" className="form-label">any diabetic/pre-diabetic history?:</label>
                        <select className="form-select"
                            value={form.diabetic_hx}
                            onChange={handleChange}
                            id="diabetic_hx"
                            name="diabetic_hx" >
                            <option selected disabled>Please Select</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">BP category:</label>
                    <select className="form-select"
                            value={form.category}
                            onChange={handleChange}
                            id="category"
                            name="category">
                            <option selected disabled>Please Select</option>
                            <option>normal</option>
                            <option>elevated</option>
                            <option>htn1</option>
                            <option>htn2</option>
                            <option>hypertensive crisis</option>
                    </select>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="education" className="form-label">Education:</label>
                        <select className="form-select"
                                value={form.education}
                                onChange={handleChange}
                                id="education"
                                name="education">
                            <option selected disabled>Please Select</option>
                            <option>bp info</option>
                            <option>diabetes</option>
                            <option>nutrition</option>
                            <option>exercise</option>
                            <option>stress mgt.</option>
                            <option>smoking</option>
                            <option>weight</option>
                            <option>other</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="new_meds" className="form-label">New/Changed meds:</label>
                        <select className="form-select"
                                value={form.new_meds}
                                onChange={handleChange}
                                id="new_meds"
                                name="new_meds">
                            <option selected disabled>Please Select</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="medication_education" className="form-label">Medication Education:</label>
                        <select className="form-select"
                                value={form.medication_education}
                                onChange={handleChange}
                                id="medication_education"
                                name="medication_education">
                            <option selected disabled>Please Select</option>
                            <option>action</option>
                            <option>side effects</option>
                            <option>precautions</option>
                            <option>med card provided</option>
                        </select>
                    </div>

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
                <div className="text-center">
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </div>

            </form>
        </div>
    )
}