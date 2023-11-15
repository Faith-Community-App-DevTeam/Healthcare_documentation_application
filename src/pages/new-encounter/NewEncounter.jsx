import Topbar from "../../components/topbar/Topbar";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../components/userContext/userContext";
import fetchData from "../../components/functions/apiRequest";
import OneToOneIntForm from "./OneToOneIntForm";
import { useNavigate } from "react-router-dom";


export default function NewEncouter() {
    const { state } = useLocation();
    const { client } = state;
    const user = useContext(UserContext).user
    const nav = useNavigate()

    const initform = {
        client_id: client.client.client_id,
        document_type: "client_care_notes"
    }

    let userInfo = {

    }

    useEffect(() => {
        async function getData() {
            let data = {
                operation: 'get_user',
                payload: {
                    username: user.username,
                    token: user.token,
                    user_to_find: user.username,
                    include_list: [
                        "first_name",
                        "last_name",
                        "network_id",
                        "church_id"
                    ]
                }
            }
            const res = await fetchData('POST', data)
            console.log(res)

            if (!ignore && res['body']['success']) {
                userInfo = res['body']['return_payload']
                console.log(userInfo)
            }
        }

        let ignore = false;
        getData()
        return () => {
            ignore = true;
        }
    }, []);

    return (
        <>
            <div className="containter bg-light">
                <Topbar />
                <div className="d-flex">
                    <div className="container-fluid mt-4 px-4">
                        <div className="container-fluid mb-4 text-center d-flex justify-content-between">
                            <button className="btn btn-outline-primary" onClick={() => { nav("/client", { state: { client: client } }) }}>Back to Client Profile</button>
                            <h1 className="display-6 text-primary">New Encounter</h1>
                            <button className="btn" onClick={() => alert("secret")}>secret</button>
                        </div>
                        <div className="row"><fieldset className="col-2">
                            <legend>User Information</legend>
                            <div className="row">
                                <label htmlFor="staticUserFirstName" className="col-sm-4 col-form-label">Your First name:</label>
                                <div className="col-sm-8">
                                    <input type="text" readOnly className="form-control-plaintext" id="staticUserFirstName" value={userInfo.first_name} />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="staticUserLastName" className="col-sm-4 col-form-label">Last name:</label>
                                <div className="col-sm-8">
                                    <input type="text" readOnly className="form-control-plaintext" id="staticLastName" value={userInfo.last_name} />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="staticUserChurchID" className="col-sm-4 col-form-label">Church Id:</label>
                                <div className="col-sm-8">
                                    <input type="text" readOnly className="form-control-plaintext" id="staticUserChurchID" value={userInfo.church_id} />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="staticUserNetworkID" className="col-sm-4 col-form-label">Network Id:</label>
                                <div className="col-sm-8">
                                    <input type="text" readOnly className="form-control-plaintext" id="staticUserNetworkID" value={userInfo.network_id} />
                                </div>
                            </div>
                        </fieldset>
                            <div className="col-10"><OneToOneIntForm initform={initform} />
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}