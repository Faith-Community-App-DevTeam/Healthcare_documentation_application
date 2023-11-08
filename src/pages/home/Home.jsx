import Topbar from '../../components/topbar/Topbar';
import './home.css';
import photo from "../../assets/homepage-photo.jpg";
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Topbar />
            {/* Header */}
            <header className="text-white bg-primary bg-opacity-50">
                <div className="container px-4 px-lg-5 text-center">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-lg-7"><img src={photo} alt='blood pressure check' className="img-fluid border border-primary rounded my-4" /></div>
                        <div className="col-lg-5"><h1 class="display-3">Empowering Care through Seemless Documentation</h1>
                            <NavLink to="register" className="btn btn-light mb-4">Get Started Today!</NavLink>
                        </div>
                    </div>
                </div>
            </header>
            <div className=" home-container-middle">
            </div>
            {/* About Row 1 */}
            <section id="text">
                <div className="container p-4">
                    <div className="row gx-4 justify-content-center">
                        <div className="col-lg-8">
                            <h2>Efficient Healthcare Documentation</h2>
                            <p className="lead fw-300">Say goodbye to paperwork and manual data entry. Our user-friendly platform empowers you to document patient information, treatment records, and medical histories with ease. We prioritize accuracy, security, and compliance at every step.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* About Row 2 */}
            <section className="bg-light">
                <div className="container p-4">
                    <div className="row gx-4 justify-content-center">
                        <div className="col-lg-8">
                            <h2>Streamlined Workflows</h2>
                            <p className="lead">Our platform is designed to save you time and reduce administrative burdens. Navigate through patient records, update information, and collaborate seamlessly with your healthcare team. We are committed to making your work more efficient.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* About Row 3 */}
            <section id="contact">
                <div className="container p-4">
                    <div className="row gx-4 justify-content-center">
                        <div className="col-lg-8">
                            <h2>HIPAA Complient Security</h2>
                            <p className="lead">Protecting sensitive patient data is non-negotiable. Rest assured, our platform adheres to the highest standards of data security and privacy, ensuring the confidentiality and integrity of patient information.</p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
};

export default Home;