import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useLocation } from "react-router-dom";

export default function Client(c) {
    const { state } = useLocation();
    const { client } = state || {};

    const date = (theDate) => {
        const d = new Date(theDate)
        return d.toLocaleDateString();
    }

    return (

        <div className="containter bg-light vh-100">
            <Topbar />
            <div className="d-flex">
                <Sidebar />
                <div className="container">
                    <div className="container p-4 d-flex ">
                        <div>
                            <img src={client.client.picture} alt="image of the client" className="rounded-5 border" height={150} width={150} />
                        </div>
                        <div className="ms-4">
                            <h2 className="display-4"><span>{client.client.first_name + " " + client.client.last_name}</span></h2>
                            <h4><span>{client.client.age}</span></h4>
                            <h4><span>{date(client.client.date_of_birth)}</span></h4>
                        </div>
                    </div>
                    <hr />
                </div>

            </div>
        </div>
    )


}