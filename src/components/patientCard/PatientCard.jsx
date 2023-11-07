export default function PatientCard(client) {

    return (
        <>
            <div className="container">

                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between mb-2 shadow-sm">
                        <div className="p-2 col">{client.client.first_name + ' ' + client.client.last_name}</div>
                        <div className="p-2 col">{client.client.gender}</div>
                        <div className="p-2 col">{client.client.date_of_birth}</div>
                        <div className="p-2 col">{client.client.age}</div>
                    </a>
                </div>
            </div>
        </>
    )
}