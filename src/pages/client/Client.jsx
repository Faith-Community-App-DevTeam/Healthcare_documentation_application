import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useLocation, useNavigate } from "react-router-dom";


export default function Client(c) {
    const { state } = useLocation();
    const { client } = state.client || {};
    const nav = useNavigate()

    const date = (theDate) => {
        const d = new Date(theDate)
        return d.toLocaleDateString();
    }

    const handleNewEncounter = () => {
        nav("/new-encounter", client)
    }
    return (

        <div className="containter bg-light vh-100">
            <Topbar />
            <div className="d-flex">
                <div className="container-fluid mt-4 px-4">
                    <div className="container-fluid mb-4 text-center d-flex justify-content-between">
                        <button className="btn btn-outline-primary">Back to All Clients</button>
                        <h1 className="display-6 text-primary">Client Profile</h1>
                        <button className="btn btn-primary" onClick={handleNewEncounter}>New Encounter</button>
                    </div>
                    <div className="row">

                        <div className="col-lg-3">
                            <div className="card text-center bg-white">
                                <h5 className="card-title">Demographics</h5>
                                <div className="card-body text-wrap">
                                    <img src={client.picture} alt="client" className="m-2 rounded-5 border" height={125} width={125} />
                                    <div className="flex-column m-4">
                                        <h2 className="" ><span>{client.first_name + " " + client.last_name}</span></h2>
                                        <span className="">{client.age + ' year old ' + client.gender + " • "}</span>
                                        <span className="">{date(client.date_of_birth)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="card bg-white text-center">
                                <h5 className="card-title">Medical History</h5>
                                <div className="card-body">

                                </div>
                            </div>

                        </div>

                        <div className="col-lg-3">
                            <div className="card bg-white text-center">
                                <h5 className="card-title">Recent Encounters</h5>
                            </div>

                        </div>

                    </div>







                </div>

            </div>
        </div>
    )


}