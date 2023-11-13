import Topbar from "../../components/topbar/Topbar";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../components/userContext/userContext";
import fetchData from "../../components/functions/apiRequest";
import OneToOneIntForm from "./OneToOneIntForm";
import { useNavigate } from "react-router-dom"

export default function NewEncouter() {
    const { state } = useLocation();
    const { client } = state.client || {};
    const user = useContext(UserContext).user
    const initform = {
        client_id: client.id,
        document_type: "client_care_notes"
    }

    const userInfo = {
        first_name: "user",
        last_name: "test_last",
        network_id: "00001",
        church_id: "0002"
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
            userInfo = res['body']['user']

        }

    }

    return (
        <>
            {getUserData}
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
                    </div>
                </div>
                <OneToOneIntForm initform={initform} />
            </div>
        </>
    )
}