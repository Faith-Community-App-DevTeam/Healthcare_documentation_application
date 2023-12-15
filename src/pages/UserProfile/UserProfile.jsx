import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import UserContext from "../../components/userContext/userContext";
import fetchData from "../../components/functions/apiRequest";
import { useEffect, useContext, useState } from "react";
import "./userProfile.css"

export default function UserProfile() {
    const user = useContext(UserContext).user
    const [userInfo, setUserInfo] = useState("")
    useEffect(() => {

        async function getData() {
            try {
                let data = {
                    operation: 'get_user',
                    payload: {
                        username: user.username,
                        token: user.token,
                        user_to_find: user.username,
                    }
                }
                const res = await fetchData('POST', data)
                console.log(res)

                if (!ignore && res['body']['success']) {
                    console.log(res['body']['return_payload'])
                    setUserInfo(res['body']['return_payload'])

                }


            } catch (error) {
                alert("Error")

            }



        }

        let ignore = false;
        getData()
        return () => {
            ignore = true;
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        console.log(form.id)
        let data


        let f = {}
        formData.forEach((value, key) => f[key] = value)

        if (form.id === "userCredForm") {
            data = {
                operation: "update_password",
                payload: {
                    username: user.username,
                    token: user.token,
                    new_password: f["password"]
                }
            }
        } else {
            data = {
                operation: "update_user",
                payload: {
                    username: user.username,
                    token: user.token,
                    user_info: f
                }
            }
            console.log(data)
        }

        const res = await fetchData("POST", data)
        console.log(res)
        if (res['body']['success']) {
            console.log("success")

            // setMessage("Update Sucessful")
        } else {
            // setMessage("Unable to complete update. Please try again.")
        }
    }

    function handleUpdate(formID) {
        const formInputs = document.getElementById(`${formID}`).elements;
        const updateButton = document.getElementById(`${formID}Update`)
        const cancelButton = document.getElementById(`${formID}Clear`)
        const saveButton = document.getElementById(`${formID}Save`)

        console.log(formInputs)

        for (let i = 0; i < formInputs.length; i++) {
            // Disable all form controls
            formInputs[i].setAttribute("readOnly", "false");
            formInputs[i].classList.remove('form-control-plaintext')
            formInputs[i].classList.add('form-control')
            formInputs[i].removeAttribute("readOnly")
            formInputs[i].removeAttribute("disabled")

        }



        updateButton.classList.add("d-none")
        cancelButton.classList.remove('d-none')
        saveButton.classList.remove('d-none')

    }

    function handleCancel(formID) {
        const formInputs = document.getElementById(`${formID}`).elements;
        const updateButton = document.getElementById(`${formID}Update`)
        const cancelButton = document.getElementById(`${formID}Clear`)
        const saveButton = document.getElementById(`${formID}Save`)

        document.getElementById(`${formID}`).reset()
        for (let i = 0; i < formInputs.length; i++) {
            // Disable all form controls
            formInputs[i].setAttribute("readOnly", "true");
            formInputs[i].classList.add('form-control-plaintext')
            formInputs[i].classList.remove('form-control')
            formInputs[i].setAttribute("readOnly", "")
            formInputs[i].setAttribute("disabled", "")
        }

        updateButton.classList.remove("d-none")
        cancelButton.classList.add('d-none')
        saveButton.classList.add('d-none')


    }




    return (
        <div className="d-flex profileContainer">
            <Sidebar />
            <div className="container-fluid px-0 mx-0">
                <Topbar page="dashboard" />
                <div className="container mt-1">

                    <div className="row m-3 justify-content-center" id="profileTopCard">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row  align-items-center">
                                        <div className="col-md-3" id="userImageCol">
                                            <div className="text-center border-end">
                                                {userInfo.picture ? <img className="border border-2 border-white rounded-circle object-fit-cover me-2" alt="not found" width={"80px"} height={"80px"} src={userInfo.picture} />
                                                    : <span><i className="bi bi-person-circle lh-1 text-tertiary opacity-50 me-2" style={{ fontSize: "80px", fontWeight: "100" }}></i></span>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-9" id="userNameID">
                                            <div className="text-center">
                                                <h4 className="text-primary display-6 mx-auto">{`${userInfo.first_name} ${userInfo.last_name}`}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row m-3 mt-0 justify-content-center">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row p-3 pt-0 justify-content-center">
                                        <div className="d-flex justify-content-between align-items-center pt-2">
                                            <h5 className="lead fs-3">Sign In Credentials</h5>
                                            <div className="">
                                                <button className="btn btn-sm btn-outline-secondary d-none" id="userCredFormClear" onClick={() => handleCancel('userCredForm')}>Cancel</button>
                                                <button className="btn btn-sm btn-primary d-none" type="submit" form="userCredForm" id="userCredFormSave">Save</button>
                                            </div>
                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => handleUpdate('userCredForm')} id="userCredFormUpdate">Edit</button>
                                        </div>
                                        <div className="row mb-1 p-4 pb-0">
                                            <div className="row ps-0">
                                                <label htmlFor="staticUsername" className="col-form-label col-sm-6 col-md-4 ">Username:</label>
                                                <div className="col-6 ms-2">
                                                    <input type="text" disabled readOnly={true} className="form-control-plaintext form-control" id="staticUsername" name="username" defaultValue={user.username} style={{ background: "white" }} />
                                                </div>
                                            </div>

                                        </div>
                                        <form action="" className="p-4 pt-0" id="userCredForm" onSubmit={handleSubmit}>
                                            <div className="row mb-1">
                                                <label htmlFor="staticPassword" className="col-form-label col-sm-6 col-md-4 ">Password:</label>
                                                <div className="col-6">
                                                    <input type="password" disabled readOnly={true} className="form-control-plaintext form-control" id="staticUsername" name="password" defaultValue={user.username} />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-3 mt-0 justify-content-center" id="profilePersonalDetails">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row p-3 pt-0 justify-content-center align-items-center">
                                        <div className="d-flex justify-content-between align-items-center pt-2">
                                            <h5 className="lead fs-3">Personal Details</h5>
                                            <div className="">
                                                <button className="btn btn-sm btn-outline-secondary d-none" id="userProfileFormClear" onClick={() => handleCancel('userProfileForm')}>Cancel</button>
                                                <button className="btn btn-sm btn-primary d-none" type="submit" form="userProfileForm" id="userProfileFormSave">Save</button>
                                            </div>
                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => handleUpdate('userProfileForm')} id="userProfileFormUpdate">Edit</button>
                                        </div>
                                        <form method="POST" className="p-4" id="userProfileForm" onSubmit={handleSubmit}>
                                            <div className="row mb-1">
                                                <label htmlFor="staticLicenseNumber" className="col-form-label col-sm-6 col-md-4 ">License Number:</label>
                                                <div className="col-6">
                                                    <input type="text" disabled readOnly={true} className="form-control-plaintext form-control" id="staticLicenseNumber" name="license_number" defaultValue={userInfo.license_number} />
                                                </div>
                                            </div>
                                            <div className="row mb-1">
                                                <label htmlFor="staticLicenseState" className="col-form-label col-sm-6 col-md-4 ">License State:</label>
                                                <div className="col-6">
                                                    <input type="text" disabled readOnly={true} className="form-control-plaintext form-control" id="staticLicenseState" name="licence_state" defaultValue={userInfo.license_state} />
                                                </div>
                                            </div>
                                            <div className="row mb-1">
                                                <label htmlFor="staticAddress" className="col-form-label col-sm-6 col-md-4 ">Address:</label>
                                                <div className="col-6">
                                                    <input type="text" disabled readOnly={true} className="form-control-plaintext form-control" id="staticAddress" name="address" defaultValue={userInfo.address} />
                                                </div>
                                            </div>
                                            <div className="row mb-1">
                                                <label htmlFor="staticPhone" className="col-form-label col-md-4 col-sm-6">Phone:</label>
                                                <div className="col-6">
                                                    <input type="text" disabled readOnly className="form-control-plaintext form-control" id="staticPhone" name="phone_number" defaultValue={userInfo.phone_number} />
                                                </div>
                                            </div>
                                            <div className="row mb-1">
                                                <label htmlFor="staticEmail" className="col-form-label col-sm-4">Email:</label>
                                                <div className="col-6">
                                                    <input type="text" disabled readOnly className="form-control-plaintext form-control" id="staticEmail" name="email" defaultValue={userInfo.email} />
                                                </div>
                                            </div>





                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>

        </div >






    )
}