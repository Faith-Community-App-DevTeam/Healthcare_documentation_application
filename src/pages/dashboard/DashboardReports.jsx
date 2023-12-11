export default function DashboardReports() {


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
                    <div className="card-body">
                        <p>
                            Use this page to generate monthly reports.
                        </p>
                    </div>
                </div>

            </div>

        </div>
    )
}