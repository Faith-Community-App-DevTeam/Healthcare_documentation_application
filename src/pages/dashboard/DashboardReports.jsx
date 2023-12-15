import UserContext from "../../components/userContext/userContext";
import fetchData from "../../components/functions/apiRequest";
import { useContext, useState } from 'react';


export default function DashboardReports() {
    // autofill the date
    const [date, setDate] = useState(() => {
        const now = new Date().toISOString().split('T')[0];
        return now;
    })
    const user = useContext(UserContext).user

    async function generateReports() {
        const data = {
            operation: "create_report",
            payload: {
                username: user.username,
                token: user.token,
                date: date
            }
        }

        const res = await fetchData("POST", data)
        // currently only creates a report on the backend
        if (res['body']['success']) {
            console.log("success")
        }
    }

    return (
        <div className="container-fluid">
            <div className="card p-2 bg-transparent border-0" >
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="text-primary mx-3" style={{ fontFamily: 'var(--display-font)' }}>Reports</h1>
                    </div>
                </div>
            </div>
            <hr className="mt-0" />
            <div className="container">
                <div className="card">
                    <div className="card-body"><p className="text-primary lead">Not currently fuctional. Does not return a response.</p>
                        <p>
                            Use this page to generate monthly reports.
                        </p>
                        <div className="row align-items-center">
                            <div className="col">
                                <label htmlFor="serviceDate" className="col-form-label col-4">Date: </label>
                                <div className="col-8">
                                    <input type="date" className="form-control" id="serviceDate" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="col">
                                <button className="btn btn-outline-secondary" onClick={generateReports}>
                                    Generate Report
                                </button>
                            </div>

                        </div>


                    </div>
                </div>

            </div>

        </div>
    )
}