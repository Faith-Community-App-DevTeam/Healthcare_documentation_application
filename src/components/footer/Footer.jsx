import './footer.css'
import logo from "../../assets/LogoRed(1).png"
export default function Footer() {
    const today = new Date();
    return (
        <>
            <footer className='navbar py-0'>
                <div className="container-fluid justify-content-start ">
                    <img src={logo} alt="" width="80" height="80" className="" />
                    <div className="px-5">
                        <h5>Faith Community Nurse Electronic Health Record, Inc.</h5>
                        <span>Copyright &copy; {today.getFullYear()}</span>
                    </div>
                </div>
            </footer>
        </>
    )


}