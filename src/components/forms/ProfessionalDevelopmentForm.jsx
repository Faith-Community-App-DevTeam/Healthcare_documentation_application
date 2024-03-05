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

    // only two inputs are required: number of people served and type of service.
    return (

        <>
            <div className="p-3">
                <hr />
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="serviceName" className="form-label">Type: <span className="text-primary">*</span></label>
                        <select name="service_name" id="serviceName" className="form-select mb-3" onChange={(e) => setServiceName(e.target.value)} required>
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
                    </div>
                    <div className="vr p-0 mx-3 d-none d-md-block"></div>

                </div>

                <hr />
                <div className="row mb-3">
                    <p>Enter Times in quarter hour increments. (0.25 = 15 min) </p>
                    <div className="col">
                        <div className="row mb-3">
                            <label htmlFor="direct_time" className="form-label">Direct Time:</label>
                            <input type="number" className="form-control mb-3" min={0.25} step={0.25} id="direct_time" name="direct_time" />
                        </div>
                    </div>
                    <div className="vr p-0 mx-4 d-none d-md-block"></div>
                    <div className="col">
                        <div className="row mb-3">
                            <label htmlFor="direct_time" className="form-label">Indirect Time:</label>
                            <input type="number" className="form-control mb-3" min={0.25} step={0.25} id="indirect_time" name="indirect_time" />
                        </div>
                    </div>

                </div>
                <hr />
                <label htmlFor="programComment" className="form-label">Comments:</label>
                <textarea name="comments" id="programComment" className="form-control mb-3" rows="3"></textarea>
                <div className="row text-center px-5">
                    <button className="btn btn-primary" type="submit" form="service">Save and Submit</button>
                </div>


            </div>
        </>

    )
}