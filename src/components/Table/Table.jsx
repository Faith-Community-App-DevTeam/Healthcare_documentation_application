export default function Table({ columns, data }) {
    // potiential function to standardize tables using the patient list table as example.
    return (
        <div className="position-relative overflow-scroll" style={{ height: "70vh" }}>
            <table className="table table-hover align-middle" id="clientTable">
                <thead className="table-light sticky-top top-0">
                    <tr>
                        <th scope="col" className="text-center" style={{ width: 150 }} onClick={() => sortTable('client_id')}>ID</th>
                        <th scole="col " style={{ width: 100 }}>Picture</th>
                        <th scope="col" onClick={() => sortTable('first_name')}>Name</th>
                        <th scope="col" className="text-end" style={{ width: 100 }}>Age</th>
                        <th scope="col" className="text-start" style={{ width: 100 }}>Gender</th>
                        <th scope="col">DOB</th>
                        {user.role == "admin" && user.isLoggedIn ? <th scope="col" style={{ width: 60 }}><i className="bi bi-x-lg"></i></th> : ""}


                    </tr>
                </thead>

                <tbody>

                </tbody>
            </table>
        </div>
    )
}