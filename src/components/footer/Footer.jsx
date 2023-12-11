import './footer.css'
import logo from "../../assets/LogoRed(1).png"
export default function Footer() {
    const today = new Date();
    return (
        <>
            <footer className=''>
                <div className="d-flex  align-items-center py-2">
                    <img src={logo} alt="" width="80" height="80" className="" />
                    <div className="">
                        <h5>Faith Community Nurse Electronic Health Record, Inc.</h5>
                        <p>Copyright &copy; {today.getFullYear()}</p>
                    </div>
                </div>
            </footer>
        </>
    )


}