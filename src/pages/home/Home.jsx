import Topbar from '../../components/topbar/Topbar';
import Footer from '../../components/footer/Footer';
import './home.css';
import photo2 from "../../assets/photo2.jpg"
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Topbar page="home" />
            {/* Header */}
            <div className="home">
                <header className="home-top">
                    <div className=" text-center">
                        <div className="row align-items-center gx-0">
                            <div className="col-lg-8"><img src={photo2} alt='blood pressure check' className="img-fluid border border-primary rounded-end-pill" /></div>
                            <div className="col col-lg-4">
                                <h1 className="header-text-dark display-2">Empowering Care through Seamless Documentation</h1>
                                <NavLink to="register" className="btn btn-primary btn-lg m-4">Request Access!</NavLink>
                            </div>
                        </div>
                    </div>
                </header>
                <div className=" home-container-middle">
                </div>
                {/* About Row 1 */}
                <section className="info-reg-top">
                    <div className="container p-4">
                        <div className="row gx-4 justify-content-center">
                            <div className="col-lg-9">
                                <h2 className="header-text-light display-6">Efficient Healthcare Documentation</h2>
                                <p className="lead fw-light lh-lg">Say goodbye to paperwork and manual data entry. Our user-friendly platform empowers you to document patient information, treatment records, and medical histories with ease. We prioritize accuracy, security, and compliance at every step.</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* About Row 2 */}
                <section className="info-light">
                    <div className="container p-4">
                        <div className="row gx-4 justify-content-center ">
                            <div className="col-lg-9">
                                <h2 className="header-text-dark display-6">Streamlined Workflows</h2>
                                <p className="lead fw-light lh-lg" >Our platform is designed to save you time and reduce administrative burdens. Navigate through patient records, update information, and collaborate seamlessly with your healthcare team. We are committed to making your work more efficient.</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* About Row 3 */}
                <section className="info-reg-bottom">
                    <div className="container p-4">
                        <div className="row gx-4 justify-content-center">
                            <div className="col-lg-9">
                                <h2 className="header-text-light display-6">HIPAA Complient Security</h2>
                                <p className="lead fw-light lh-lg">Protecting sensitive patient data is non-negotiable. Rest assured, our platform adheres to the highest standards of data security and privacy, ensuring the confidentiality and integrity of patient information.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />

        </>
    )
};

export default Home;