import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useLocation, useNavigate } from "react-router-dom";
import "./client.css";


export default function Client(c) {
    const { state } = useLocation();
    const { client } = state;
    const nav = useNavigate()


    const date = (theDate) => {
        const d = new Date(theDate)
        return d.toLocaleDateString();
    }

    const handleNewEncounter = () => {
        nav("/new-encounter", { state: { client: client } })
    }
    return (

        <div className="vh-100">
            <Topbar page="client" />
            <div className="d-flex">
                <div className="container-fluid mt-4 px-4 clientContainer">
                    <div className="mb-4 text-center d-flex justify-content-between">
                        <button className="btn btn-outline-primary" onClick={() => { nav("/dashboard") }}>Back to All Clients</button>
                        <h1 className="display-6 text-primary" id='pageTitle'>Client Profile</h1>
                        <button className="btn btn-primary" onClick={handleNewEncounter}>New Encounter</button>
                    </div>
                    <div className="row">

                        <div className="col-lg-3">
                            <div className="card text-center demoCard">
                                <h5 className="mt-2 mb-0" id="cardInfoTitle">Demographics</h5>
                                <hr />
                                <div className="card-body text-wrap">
                                    <img src={client.client.picture} alt="client" className="m-2 rounded-5 border" height={125} width={125} />
                                    <div className="flex-column m-4">
                                        <h2 className="" ><span>{client.client.first_name + " " + client.client.last_name}</span></h2>
                                        <span className="">{client.client.age + ' year old ' + client.client.gender + " • "}</span>
                                        <span className="">{date(client.client.dob)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 ">
                            <div className="card bg-white text-center histCard">
                                <h5 className="card-title mt-2" id="cardInfoTitle">Medical History</h5>
                                <hr />
                                <div className="card-body">

                                </div>
                            </div>

                        </div>

                        <div className="col-lg-3 ">
                            <div className="card text-center encCard">
                                <hr />
                                <h5 className="card-title mt-2" id="cardInfoTitle">Recent Encounters</h5>
                            </div>

                        </div>

                    </div>







                </div>

            </div>
        </div>
    )


}