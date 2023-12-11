import "bootstrap/js/dist/tab";
import { useState, useContext } from "react";
import ChurchClassForm from "../../components/forms/ChurchClassForm";
import UserContext from "../../components/userContext/userContext";
import fetchData from "../../components/functions/apiRequest";
import ProfessionalDevelopmentForm from "../../components/forms/ProfessionalDevelopmentForm";

export default function DashboardForms() {
    const user = useContext(UserContext).user
    const [category, setCategory] = useState("");
    const [date, setDate] = useState(() => {
        const now = new Date().toLocaleDateString('en-CA');
        return now;
    })


    function handleCategory(e) {
        const cat = e.target.value;
        if (cat === "church_class") {
            console.log(cat)
            return <ChurchClassForm />
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)


        let f = {}
        formData.forEach((value, key) => f[key] = value)

        const data = {
            operation: "create_client",
            payload: {
                username: user.username,
                token: user.token,
                client_info: f
            }
        }

        console.log(data.payload.client_info)

        // const res = await fetchData("POST", data)
        // console.log(res)
        // if (res['body']['success']) {
        //     console.log("success")
        // }

    };

    return (
        <>
            <div className="container-fluid">
                <div className="card p-2 bg-transparent border-0" >
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <h1 className="text-primary mx-3" style={{ fontFamily: 'var(--display-font)' }}>Forms</h1>
                        </div>
                    </div>
                </div>
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
                                    <select name="category_of_service" id="catService" className="form-select" onChange={(e) => setCategory(e.target.value)}>
                                        <option defaultValuevalue="na" disabled>Please Select</option>
                                        <option value="church_class">Church Class/Program</option>
                                        <option value="professional_development">Professional Development</option>
                                    </select>
                                </div>
                            </div>
                            {category === "church_class" ? <ChurchClassForm /> : ""}
                            {category === "professional_development" ? <ProfessionalDevelopmentForm /> : ""}
                        </form>


                    </div>

                </div>

            </div>
        </>

    )
}