import { useState, useContext } from "react";
import ChurchClassForm from "../../components/forms/ChurchClassForm";
import UserContext from "../../components/userContext/userContext";
import fetchData from "../../components/functions/apiRequest";
import ProfessionalDevelopmentForm from "../../components/forms/ProfessionalDevelopmentForm";

// page for the group forms
export default function DashboardForms() {
    const user = useContext(UserContext).user
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("")

    // autofill the date
    const [date, setDate] = useState(() => {
        const now = new Date().toLocaleDateString('en-CA');
        return now;
    })

    async function handleSubmit(e) {
        setMessage("Request Sent. Loading.")
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)

        //handle the age range checkboxes
        const ages = formData.getAll("age_range")
        if (ages.length !== 0) {
            formData.delete("age_range")
            formData.append("age_range", ages)
        }

        console.log(formData)

        let f = {}
        formData.forEach((value, key) => f[key] = value)

        const data = {
            operation: "create_document",
            payload: {
                username: user.username,
                token: user.token,
                document_info: f
            }
        }

        const res = await fetchData("POST", data)
        console.log(res)
        if (res['body']['success']) {
            setMessage("Successfully submitted.")
            console.log("success")
        }

    };

    return (
        <>

            <hr className="mt-0" />
            <div className="container-fluid container-lg">
                <div className="card mb-4">
                    <div className="card-header">
                        <h4>Record New Form</h4>
                    </div>
                    <p className="p-4 mb-0">
                        Use these forms to document monthly service. The form is also used to document professional volunteer hours if you are audited by the Alaska Board of Nursing for relicensure.
                        Note: Time spent driving to volunteer functions may not be used as this time is not considered professional volunteer time by the Alaska Board of Nursing.
                    </p>
                    <hr className="m-0 p-0" />
                    <form method="POST" id='service' onSubmit={handleSubmit}>
                        <div className="row p-3">
                            <label htmlFor="serviceDate" className="col-form-label col-4">Date: </label>
                            <div className="col-8">
                                <input type="date" className="form-control" id="serviceDate" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>
                        </div>
                        <div className="row p-3">
                            <label htmlFor="formType" className="col-form-label col-4">Category of Service: </label>
                            <div className="col-8">
                                <select name="document_type" id="catService" className="form-select" onChange={(e) => setCategory(e.target.value)}>
                                    <option defaultValue="na" selected disabled>Please Select</option>
                                    <option value="Church Class/Program">Church Class/Program</option>
                                    <option value="Professional Development">Professional Development</option>
                                </select>
                            </div>
                        </div>
                        <div className="row justify-content-center mb-0">
                            <span className="lead text-primary text-center">{message}</span>
                        </div>
                        {/* load the correct form */}
                        {category === "Church Class/Program" ? <ChurchClassForm />
                            : category === "Professional Development" ? <ProfessionalDevelopmentForm /> : ""}


                    </form>


                </div>

            </div>


        </>

    )
}