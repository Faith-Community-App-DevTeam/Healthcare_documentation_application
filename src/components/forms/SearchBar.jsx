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
    console.log(props.type)
    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target
        const formData = new FormData(form)
        const searchTerm = formData.get("search")
        if (props.type === 'patient') {
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

            <input class="form-control form-control" list="clientOptions" type="search" placeholder="Search..." name="search" />
            <datalist id="clientOptions">
                {generateList()}
            </datalist>

        </form>



    )
}