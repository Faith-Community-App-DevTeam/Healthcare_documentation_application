import tooltip from "bootstrap/js/dist/tooltip"
import { useEffect } from "react"
import interventions from "./NICList"


export default function NICTable({ setIntv }) {
    const coreIntv = [].concat(interventions)
        .filter((intv) => intv["Core FCN Intervention"])

    const genIntv = [].concat(interventions)
        .filter((intv) => !(intv["Core FCN Intervention"]))

    let userIntv = []

    useEffect(() => {
        //init tooltip
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new tooltip(tooltipTriggerEl))

    });
    function saveInterventions() {
        console.log(userIntv)
        setIntv([...userIntv])
    }

    function selectInterventions(e) {
        const value = e.target.value
        if (e.target.checked) {
            userIntv.push(value)
        } else {
            const userIndex = userIntv.findIndex((v) => v === value)
            userIntv.splice(userIndex, 1)
        }

    }

    function getInterventions(list) {
        let arr = [];

        for (let i = 0; i < Object.keys(list).length; i++) {
            arr.push(
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" name="Interventions" value={list[i]["Nursing Intervention"]} id="NIC" autocomplete="off" onChange={selectInterventions} />
                    <label className="form-check-label mb-2" htmlFor="NIC" data-bs-toggle="tooltip" data-bs-title={list[i]["Definition"]}>{list[i]["Nursing Intervention"]}</label>
                </div>
            )
        }

        return arr
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#NICmodal">
                <i class="bi bi-plus-lg"></i>
            </button>
            <div className="modal fade" id="NICmodal" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="staticBackdropLabel">Nursing Intervention Classifications</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="">
                                    <h6 className="fst-italic mb-2 fw-light">Choose from the following interventions. Hover to view definitions. </h6>
                                </div>
                                <hr />
                                <p class="d-inline-flex gap-1">
                                    <h5>Core FCN Interventions</h5>
                                </p>
                                <div className="collapse multi-collapse show" id="FCNCore">
                                    <div className="row">
                                        <div className="row">
                                            <div className="col">
                                                {getInterventions(coreIntv.slice(0, 5))}
                                            </div>
                                            <div className="col">
                                                {getInterventions(coreIntv.slice(5, 10))}
                                            </div>
                                            <div className="col">
                                                {getInterventions(coreIntv.slice(10, 15))}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <button class="btn btn-outline-secondary btn-sm mb-3" data-bs-toggle="collapse" data-bs-target="#moreFCNCore" type="button" role="button" >+ View More</button>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="collapse" id="moreFCNCore">
                                            <div className="row">
                                                <div className="col">
                                                    {getInterventions(coreIntv.slice(15, 20))}
                                                </div>
                                                <div className="col">
                                                    {getInterventions(coreIntv.slice(25, 30))}
                                                </div>
                                                <div className="col">
                                                    {getInterventions(coreIntv.slice(30))}
                                                </div>
                                            </div>

                                        </div>
                                    </div >

                                </div>
                                <div className="row">
                                    <button class="btn btn-outline-secondary btn-sm mb-3" data-bs-toggle="collapse" data-bs-target=".multi-collapse" type="button" > View/Hide General Interventions</button>
                                </div>


                                <p class="d-inline-flex gap-1">
                                    <h5>General Nursing Interventions</h5>

                                </p>
                                <div className="row">
                                    <div className="collapse multi-collapse" id="genNIC">
                                        <hr />
                                        <div className="row">
                                            <div className="row">
                                                <div className="col">
                                                    {getInterventions(genIntv.slice(0, 6))}
                                                </div>
                                                <div className="col">
                                                    {getInterventions(genIntv.slice(6, 12))}
                                                </div>
                                                <div className="col">
                                                    {getInterventions(genIntv.slice(12, 17))}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <button class="btn btn-outline-secondary btn-sm mb-3" data-bs-toggle="collapse" data-bs-target="#moreGenNIC" type="button" role="button" >+ View More</button>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="collapse" id="moreGenNIC">
                                                <div className="row">
                                                    <div className="col">
                                                        {getInterventions(genIntv.slice(17, 24))}
                                                    </div>
                                                    <div className="col">
                                                        {getInterventions(genIntv.slice(24, 31))}
                                                    </div>
                                                    <div className="col">
                                                        {getInterventions(genIntv.slice(31))}
                                                    </div>
                                                </div>

                                            </div>
                                        </div >
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" type="button" data-bs-dismiss="modal" aria-label="Close" onClick={saveInterventions}>Save Options and Close</button>
                        </div>
                    </div >

                </div>

            </div>
        </div>
    )
}
