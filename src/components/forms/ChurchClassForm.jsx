import { useState } from "react"


export default function ChurchClassForm() {
    const [serviceName, setServiceName] = useState("")

    const otherService = (
        <div className="">
            <label htmlFor="otherServiceName" className="form-label">Please name the type of service:</label>
            <input type="text" className="form-control mb-3" id="otherServiceName" name="service_provided" />
        </div>)



    return (

        <>
            <div className="p-3">
                <hr />
                <div className="row">
                    <div className="col">
                        <label htmlFor="serviceProvided" className="form-label">Service Provided:</label>
                        <select name="service_provided" id="serviceProvided" className="form-select mb-3" onChange={(e) => setServiceName(e.target.value)}>
                            <option value="" disabled selected>Please Choose the Service Provided</option>
                            <option value="program">Programs (Journey to Bethlehem, We Can, etc...)</option>
                            <option value="faith_comm_education">Faith community education event</option>
                            <option value="support_group">Support Group</option>
                            <option value="health_education">Written health related education (bulletin, newsletter, brochure)</option>
                            <option value="health_ministry_organization">Health Ministry organization (documentation, etc...)</option>
                            <option value="other">Other</option>
                        </select>
                        {serviceName === 'other' ? otherService : ""}
                    </div>
                    <div className="vr p-0 mx-4 d-none d-md-block"></div>
                    <div className="col">
                        <label htmlFor="serviceDesc" className="form-label">Description:</label>
                        <textarea name="service_description" className="form-control mb-3" id="" ></textarea>
                    </div>
                </div>
                <hr />


                <div className="row">
                    <div className="col-4">
                        <label htmlFor="people_served" className="form-label">Number of People Served</label>

                        <input type="number" className="form-control mb-3" min={0} />
                    </div>
                    <div className="vr p-0 mx-4 d-none d-md-block"></div>
                    <div className="col-6">
                        <p>Age Range of Participants:</p>
                        <div className="d-flex">
                            <div className="mb-3 me-3">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="ageRange" name="age_range" value={"0-4"} />
                                    <label htmlFor="ageRange" className="form-check-label">0-4</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="ageRange" name="age_range" value={"5-13"} />
                                    <label htmlFor="ageRange" className="form-check-label">5-13</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="ageRange" name="age_range" value={"14-18"} />
                                    <label htmlFor="ageRange" className="form-check-label">14-18</label>
                                </div>
                            </div>
                            <div className="mb-3 me-3">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="ageRange" name="age_range" value={"19-30"} />
                                    <label htmlFor="ageRange" className="form-check-label">19-30</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="ageRange" name="age_range" value={"31-50"} />
                                    <label htmlFor="ageRange" className="form-check-label">31-50</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="ageRange" name="age_range" value={"51-65"} />
                                    <label htmlFor="ageRange" className="form-check-label">51-65</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="ageRange" name="age_range" value={"66-80"} />
                                    <label htmlFor="ageRange" className="form-check-label">66-80</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="ageRange" name="age_range" value={"81-90"} />
                                    <label htmlFor="ageRange" className="form-check-label">81-90</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="ageRange" name="age_range" value={"91+"} />
                                    <label htmlFor="ageRange" className="form-check-label">91+</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <hr />

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="indirect_time" className="form-label mb-3">Indirect Time:</label>
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
                    <div className="vr p-0 mx-4 d-none d-md-block"></div>
                    <div className="col">
                        <label htmlFor="direct_time" className="form-label">Direct Time:</label>
                        <select className="form-select mb-3"
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
                <hr />
                <div className="row text-center  px-5">
                    <button className="btn btn-primary" type="submit" form="service">Save and Submit</button>
                </div>



            </div>
        </>

    )
}