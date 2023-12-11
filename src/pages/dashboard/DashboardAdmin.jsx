import { useContext, useEffect, useState } from "react"
import UserContext from "../../components/userContext/userContext"
import fetchData from "../../components/functions/apiRequest"
import AdminUsersTable from "../../components/Tables/AdminUsersTable"
import SearchBar from "../../components/forms/SearchBar"


export default function DashboardAdmin(users) {
    let arr = []
    const [selectedUsers, setSelectedUsers] = useState([])
    const [crudBox, setCrudBox] = useState("")
    const user = useContext(UserContext).user
    const [nurses, setNurses] = useState()
    const [searchedNurses, setSearchedNurse] = useState("")

    useEffect(() => {
        async function getNurses() {
            let data = {
                operation: 'get_user_list',
                payload: {
                    username: user.username,
                    token: user.token,
                }
            }
            const res = await fetchData('POST', data)
            if (!ignore && res['body']['success']) {
                setNurses(res['body']["return_payload"])
            }
        }

        let ignore = false;
        if (user.role === "admin") {
            getNurses()

        }

        return () => {
            ignore = true;
        }
    }, []);



    async function handleUpdate(e) {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        let f = {}
        formData.forEach((value, key) => f[key] = value)

        for (let i = 0; i < selectedUsers.length; i++) {
            let data = {
                operation: "update_user_by_admin",
                payload: {
                    username: user.username,
                    token: user.token,
                    user_to_update: selectedUsers[i],
                    user_info: {
                        role: "admin"
                    }

                }
            }

            const res = await fetchData("POST", data)
            console.log(res)
            if (res['body']['success']) {
                console.log("success")
            }

        }
    }
    const updateBox = (
        <div className="card my-2 p-4 bg-light">
            <form method="POST" id="adminForm" onSubmit={handleUpdate}>
                <label htmlFor="role" className="form-label">Make User(s) an Admin?</label>
                <select className="form-select mb-2" id="role" name="makeAdmin">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <div className="d-flex">
                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                    <button className="btn btn-outline-secondary" onClick={() => setCrudBox("")}>Cancel</button>
                </div>

            </form>

        </div>
    )

    const networkBox = (
        <div className="card my-2 p-4 bg-light">
            <form method="POST" id="adminForm" onSubmit={handleUpdate}>
                <label htmlFor="role" className="form-label">Make User(s) an Admin?</label>
                <select className="form-select mb-2" id="role" name="makeAdmin">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <div className="d-flex">
                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                    <button className="btn btn-outline-secondary" onClick={() => setCrudBox("")}>Cancel</button>
                </div>

            </form>

        </div>
    )






    return (
        <div className="container-fluid">
            <div className="card p-2 bg-transparent border-0" >
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="text-primary mx-3" style={{ fontFamily: 'var(--display-font)' }}>Admin Panel</h1>
                    </div>
                </div>
            </div>
            <hr className="mt-0" />
            <div className="container">

                <div className="row">
                    <div className="col">
                        {nurses && (<SearchBar users={nurses} type="users" setSeach={setSearchedNurse} />)}
                        <AdminUsersTable users={nurses} setUsers={setSelectedUsers} />
                    </div>

                    <div className="col-auto">

                        <button className="btn btn-outline-secondary me-4" onClick={() => setCrudBox('update')}>Update User Role</button>
                        <button className="btn btn-outline-secondary me-4" onClick={() => setCrudBox('network')}>Update User Network</button>
                        <button className="btn btn-outline-secondary">Delete User</button>
                        {crudBox === 'update' ? updateBox : ""}
                    </div>
                </div>



            </div>

        </div>
    )
}