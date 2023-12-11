export default function MedicalCard(props) {
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


        console.log(formInputs)
        console.log(updateButton.classList)

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
        <div className="row">
            <div className="col">
                <div className="card shadow histCard">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center pt-2">
                            <h5 className="lead fs-3">History</h5>
                            <div className="">
                                <button className="btn btn-sm btn-outline-secondary d-none" onClick={handleCancel} id="clearDemoButton">Cancel</button>
                                <button className="btn btn-sm btn-primary d-none" onClick={handleUpdate} id="saveDemoButton">Save</button>
                            </div>
                            <button className="btn btn-sm btn-outline-secondary" onClick={handleUpdate} id="updateDemoButton">Edit</button>
                        </div>
                    </div>
                    <div className="card-body bg-white ">
                        <form method="POST" className="p-4" id="medHistForm" onSubmit={handleSubmit}>
                            <div className="row p-3 pt-0">

                                <div className="row">
                                    <label htmlFor="staticPhysName" className="col-form-label col-sm-4">Primary Physician:</label>
                                    <div className="col-sm-8">
                                        <input type="text" readOnly className="form-control-plaintext form-control" id="staticPhysName" defaultValue={client.primary_physician_name} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="staticPhysNumber" className="col-form-label col-sm-4">Primary Physician Number:</label>
                                    <div className="col-sm-8">
                                        <input type="text" readOnly className="form-control-plaintext form-control" id="staticPhysNumber" defaultValue={client.primary_physician_number} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="staticMedication" className="col-form-label col-sm-4 ">Medications:</label>
                                    <div className="col-sm-8">
                                        <input type="text" readOnly className="form-control-plaintext form-control" id="staticMedication" defaultValue={client.medications} />
                                    </div>
                                </div>

                                <div className="row">
                                    <label htmlFor="staticHeight" className="col-form-label col-sm-4">Height:</label>
                                    <div className="col-sm-8">
                                        <input type="text" readOnly className="form-control-plaintext form-control" id="staticEmail" defaultValue={client.height} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="staticWeight" className="col-form-label col-sm-4">Weight:</label>
                                    <div className="col-sm-8">
                                        <input type="text" readOnly className="form-control-plaintext form-control" id="staticEMContact" defaultValue={client.weight} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="staticBMI" className="col-form-label col-sm-4">BMI:</label>
                                    <div className="col-sm-8">
                                        <input type="text" readOnly className="form-control-plaintext form-control" id="staticEMContact" defaultValue={client.BMI} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="staticA1C" className="col-form-label col-sm-4">A1C:</label>
                                    <div className="col-sm-8">
                                        <input type="text" readOnly className="form-control-plaintext form-control" id="staticEMContact" defaultValue={client.A1C} />
                                    </div>
                                </div>


                            </div>
                        </form>
                    </div>
                </div>
                {/* med history */}
                {/* <div class="tab-pane fade" id="nav-profile" role="tabpanel" tabIndex="0"> */}

            </div>
        </div>
    )
}