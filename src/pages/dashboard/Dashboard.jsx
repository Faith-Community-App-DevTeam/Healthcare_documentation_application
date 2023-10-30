import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import data from "./data.json";


const Dashboard = () => {

    const getHeadings = () => {
        return Object.keys(data[0])
    }


    return (
        <>
            <div style={{ height: "100vh" }}>
                <Topbar />
                <div className="d-flex">
                    <Sidebar user="Jaaliyah A" />
                    <div className="container-md px-4" style={{ marginTop: 25 }}>
                        <div className="container-fluid">
                            <form action="POST" className="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success" type="submit">Search</button>

                            </form>
                        </div>
                        <h1 className="display-6 text-primary"> All Clients</h1>
                        <hr></hr>
                        <div class="card-body table-responsive-md" style={{ maxHeight: 600 }}>
                            <table className="table" style={{ border: "0.2px solid black" }}>
                                <thead>
                                    <tr>
                                        {getHeadings().map(heading => {
                                            return <th key={heading}>{heading}</th>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, index) => {
                                        return <tr key={index}>
                                            {getHeadings().map((key, index) => {
                                                return <td key={row[key]}>{row[key]}</td>
                                            })}
                                        </tr>;
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;