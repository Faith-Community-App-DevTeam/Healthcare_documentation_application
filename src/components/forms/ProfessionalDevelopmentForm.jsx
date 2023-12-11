import { useState } from "react"


export default function ProfessionalDevelopmentForm() {
    const [serviceName, setServiceName] = useState("")

    const otherService = (
        <div className="">
            <label htmlFor="class_name" className="form-label">Please name the type of professional development:</label>
            <input type="text" className="form-control mb-3" id="otherServiceName" name="service_name" />
        </div>)

    const notice = (
        <p>(Please note that for relicensure for the BON, continuing education is a separate
            category from professional volunteer and meetings should reflect the nursing
            process, ie: assess, plan, evaluate, etc, not be solely a social gathering.)</p>
    )

    return (

        <>
            <div className="p-3">
                <hr />
                <label htmlFor="serviceName" className="form-label">Type:</label>
                <select name="service_name" id="serviceName" className="form-select mb-3" onChange={(e) => setServiceName(e.target.value)}>
                    <option value="" disabled selected>Please choose the type of Professional Development</option>
                    <option value="meeting">Meetings</option>
                    <option value="health_ministry_meeting">Health Ministry Meetings</option>
                    <option value="fcn meeting">FCN Meeting</option>
                    <option value="network_meeting">Monthly Network Meetings</option>
                    <option value="continuing education">Continuing education</option>
                    <option value="other">Other</option>
                </select>
                {serviceName === 'other' ? otherService : ""}
                {serviceName === "continuing education" ? notice : ""}
                <label htmlFor="people_served" className="form-label">Number of People Served</label>
                <input type="number" className="form-control mb-3" min={0} />
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="indirect_time" className="form-label">Indirect Time:</label>
                        <select className="form-select"
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
                    <div className="col">
                        <label htmlFor="direct_time" className="form-label">Direct Time:</label>
                        <select className="form-select"
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
                </div>
                <label htmlFor="programComment" className="form-label">Comments:</label>
                <textarea name="comments" id="programComment" className="form-control mb-3" rows="3"></textarea>
                <button className="btn btn-primary" type="submit" form="service">Save and Submit</button>


            </div>
        </>

    )
}