export default function SearchBar(props) {
    let list = []


    function generateList() {

        //type is either clients or user
        if (props.type === 'clients') {
            list = props.clients.allClients
            return (list.map(client => <option value={client.first_name + " " + client.last_name}></option>))
        } else {
            list = props.users
            let arr = []
            for (let i = 0; i < Object.keys(list).length; i++) {
                let username = Object.keys(list)[i]
                arr.push(
                    <option value={props.users[username]['first_name'] + " " + props.users[username]['last_name']}></option>
                )
            }
            return arr
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target
        const formData = new FormData(form)
        const searchTerm = formData.get("search")
        if (props.type === 'clients') {
            props.setSearch(list.filter((client) => `${client.first_name} ${client.last_name}` === `${searchTerm}`))
        } else {
            for (let i = 0; i < Object.keys(list).length; i++) {
                let username = Object.keys(list)[i]
                if (`${props.users[username]['first_name']} ${props.users[username]['last_name']}` === `${searchTerm}`) {
                    console.log(props.users[username])
                    props.setSearch(props.users[username])
                }
            }
        }

    }




    return (
        <div className="card mb-3">
            <div className="card-body">
                <form action="" onSubmit={handleSubmit}>
                    <div class="hstack gap-3">
                        <input class="form-control form-control-lg me-auto" list="clientOptions" type="search" placeholder="Search..." name="search" />
                        <datalist id="clientOptions" >
                            {generateList()}
                        </datalist>
                        <button type="submit" class="btn btn-secondary">Submit</button>
                        <div class="vr"></div>
                        <button type="button" class="btn btn-outline-danger" onClick={() => { props.setSearch("") }}>Reset</button>

                    </div>
                </form>
            </div>
        </div>

    )
}