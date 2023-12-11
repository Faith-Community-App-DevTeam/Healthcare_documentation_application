import "./clientProfileCards.css"

export default function DemegraphicsCard(props) {
    const client = props.client.client

    function handleSubmit() {
        //     e.preventDefault();
        //     const form = e.target;
        //     const formData = new FormData(form)
        //     const r = formData.getAll('race')
        //     console.log(r)
        //     formData.delete('race')
        //     formData.append("race", r)
        //     formData.append('age', age)

        //     let f = {}
        //     formData.forEach((value, key) => f[key] = value)
        //     const fJson = JSON.stringify(f)

        //     const data = {
        //         operation: "update_client",
        //         payload: {
        //             username: user.username,
        //             token: user.token,
        //             client_info: f
        //         }
        //     }

        //     console.log(data.payload.client_info)

        //     const res = await fetchData("POST", data)
        //     console.log(res)
        //     if (res['body']['success']) {
        //         console.log("success")
        //         nav("/client", { state: { client: { client } } })
        //     }
    }

    function handleUpdate() {
        const formInputs = document.getElementById('demoForm').elements;
        const updateButton = document.getElementById('updateDemoButton')
        const cancelButton = document.getElementById('clearDemoButton')
        const saveButton = document.getElementById('saveDemoButton')

        console.log(formInputs)

        for (let i = 0; i < formInputs.length; i++) {
            // Disable all form controls
            formInputs[i].setAttribute("readOnly", "false");
            formInputs[i].classList.remove('form-control-plaintext')
            formInputs[i].classList.add('form-control')
            formInputs[i].removeAttribute("readOnly")
        }



        updateButton.classList.add("d-none")
        cancelButton.classList.remove('d-none')
        saveButton.classList.remove('d-none')

    }

    function handleCancel() {
        const formInputs = document.getElementById('demoForm').elements;
        const updateButton = document.getElementById('updateDemoButton')
        const cancelButton = document.getElementById('clearDemoButton')
        const saveButton = document.getElementById('saveDemoButton')

        document.getElementById('demoForm').reset()
        for (let i = 0; i < formInputs.length; i++) {
            // Disable all form controls
            formInputs[i].setAttribute("readOnly", "true");
            formInputs[i].classList.add('form-control-plaintext')
            formInputs[i].classList.remove('form-control')
            formInputs[i].setAttribute("readOnly", "")
        }

        updateButton.classList.remove("d-none")
        cancelButton.classList.add('d-none')
        saveButton.classList.add('d-none')
        console.log(client.ethnicity)

    }



    return (

        <div className="card shadow demoCard">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center pt-2">
                    <h5 className="lead fs-3">Demographics</h5>
                    <div className="">
                        <button className="btn btn-sm btn-outline-secondary d-none" onClick={handleCancel} id="clearDemoButton">Cancel</button>
                        <button className="btn btn-sm btn-primary d-none" onClick={handleUpdate} id="saveDemoButton">Save</button>
                    </div>
                    <button className="btn btn-sm btn-outline-secondary" onClick={handleUpdate} id="updateDemoButton">Edit</button>
                </div>

            </div>
            <div className="card-body bg-white">
                <form method="POST" className="p-4" id="demoForm" onSubmit={handleSubmit}>
                    <div className="row p-3 pt-0">
                        <div className="row mb-1">
                            <label htmlFor="staticAddress" className="col-form-label col-sm-6 col-md-4 ">Address:</label>
                            <div className="col-md-8 col-sm-6">
                                <input type="text" readOnly={true} className="form-control-plaintext form-control" id="staticAddress" defaultValue={client.address} />
                            </div>
                        </div>
                        <div className="row mb-1">
                            <label htmlFor="staticPhone" className="col-form-label col-md-4 col-sm-6">Phone:</label>
                            <div className="col-sm-8">
                                <input type="text" readOnly className="form-control-plaintext form-control" id="staticPhone" defaultValue={client.phone_number} />
                            </div>
                        </div>
                        <div className="row mb-1">
                            <label htmlFor="staticEmail" className="col-form-label col-sm-4">Email:</label>
                            <div className="col-sm-8">
                                <input type="text" readOnly className="form-control-plaintext form-control" id="staticEmail" defaultValue={client.email} />
                            </div>
                        </div>
                        <div className="row mb-1">
                            <label htmlFor="staticEMContact" className="col-form-label col-sm-4">Emergency Contact:</label>
                            <div className="col-sm-8">
                                <input type="text" readOnly className="form-control-plaintext form-control" id="staticEMContact" defaultValue={client.emergency_contact} />
                            </div>
                        </div>
                        <div className="row mb-1">
                            <label htmlFor="staticECPhone" className="col-form-label col-sm-4">Emegency Contact Phone:</label>
                            <div className="col-sm-8">
                                <input type="text" readOnly className="form-control-plaintext form-control" id="staticECPhone" defaultValue={client.emergency_phone_number} />
                            </div>
                        </div>
                        <div className="row mb-1">
                            <label htmlFor="staticOccupation" className="col-form-label col-sm-4">Occupation:</label>
                            <div className="col-sm-8">
                                <input type="text" readOnly className="form-control-plaintext form-control" id="staticOccupation" defaultValue={client.occupation} />
                            </div>
                        </div>
                        <div className="row mb-1">
                            <label htmlFor="staticInsurance" className="col-form-label col-sm-4">Insurance:</label>
                            <div className="col-sm-8">
                                <input type="text" readOnly className="form-control-plaintext form-control" id="staticInsurance" defaultValue={client.insurance} />
                            </div>
                        </div>


                        <div className="row mb-1">
                            <div className="col">
                                <label htmlFor="ethnicity" className="form-label-sm col-sm-4">Ethnicity: </label>
                            </div>
                            <div className="col-sm-8">
                                <p>{client.ethnicity}</p>
                            </div>
                        </div>
                        <select name="ethnicity" id="ethnicity" className="form-select d-none" defaultValue={client.ethnicity} disabled>
                            <option>Hispanic or Latino</option>
                            <option>Not Hispanic or Latino</option>
                        </select>


                        <div className="row mb-3">
                            <div className="col-sm-4">
                                <p>Race: </p>
                            </div>
                            <div className="col-sm-8">
                                <p>{client.race}</p>
                            </div>

                            <div className="d-none" id="raceForm">
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



                    </div>
                </form>
            </div >
        </div >


    )

}