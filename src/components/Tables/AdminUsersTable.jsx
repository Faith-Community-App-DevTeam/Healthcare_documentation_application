
export default function AdminUsersTable(props) {
    function selectUsers() {
        const checkedBoxes = document.querySelectorAll('input[name=user]:checked');
        let ar = []
        checkedBoxes.forEach((value) => ar.push(value.value))
        props.setUsers(ar)

    }

    function createElements() {
        let arr = []
        for (let i = 0; i < Object.keys(props.users).length; i++) {
            let username = Object.keys(props.users)[i]
            arr.push(
                <tr>
                    {/* <td><button className="btn" onClick={selectUsers}><i className="bi bi-check-square"></i></button></td> */}
                    <td className="p-3"><input className="form-check" type="checkbox" id="user" name="user" value={username} onChange={selectUsers} /></td>
                    <td className="p-3">
                        {username}
                    </td>
                    <td className="p-3">
                        {props.users[username]['first_name'] + " " + props.users[username]['last_name']}
                    </td>
                    <td className="p-3">
                        {props.users[username]['email']}
                    </td>
                    <td className="p-3">
                        {props.users[username]['role'] === "admin" ? "Yes" : "No"}
                    </td>
                    <td className="p-3">
                        {props.users[username]['network_id']}
                    </td>
                </tr>
            )
        }
        return arr
    }

    return (

        <div className="table-responsive card-header">
            <table className="table table-hover table-striped table-bordered align-middle" id="adminTable">
                <thead className="table-light">
                    <tr>
                        <th scope="col" style={{ width: 60 }}><i className="bi bi-check-square"></i></th>
                        <th scope="col">Username</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col" style={{ width: 100 }}>Admin?</th>
                        <th scope="col">Network</th>
                    </tr>
                </thead>
                <tbody>
                    {!!props.users && (createElements())}
                </tbody>

            </table>
        </div>


    )
}