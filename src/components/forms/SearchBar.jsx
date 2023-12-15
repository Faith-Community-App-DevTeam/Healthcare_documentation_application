export default function SearchBar(props) {
    let list = []


    function generateList() {

        //type is either clients or user
        if (props.type === 'patient') {
            list = props.patients.allPatients
            return (list.map(patient => <option value={patient.first_name + " " + patient.last_name}></option>))
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
        if (props.type === 'patients') {
            props.setSearch(list.filter((patient) => `${patient.first_name} ${patient.last_name}` === `${searchTerm}`))
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


        <form action="" onSubmit={handleSubmit}>
            <div className="row align-items-center justify-content-center">
                <div className="col-8">
                    <input class="form-control form-control-lg" list="clientOptions" type="search" placeholder="Search..." name="search" />
                    <datalist id="clientOptions">
                        {generateList()}
                    </datalist>
                </div>
                <div className="col-auto">
                    <div className="row justify-content-center">
                        <div className="col-auto"><button type="submit" class="btn btn-secondary btn-sm">Submit</button></div>
                        <div className="vr p-0 mx-1"></div>
                        <div className="col-auto"><button type="button" class="btn btn-outline-danger btn-sm" onClick={() => { props.setSearch("") }}>Reset</button></div>
                    </div>
                </div>
            </div>
        </form>



    )
}