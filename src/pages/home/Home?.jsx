import Topbar from '../../components/topbar/Topbar';
import './home.css';
import photo from "../../assets/homepage-photo.jpg";

const Home = () => {
    return (
        <>
            <Topbar />
            <div className="home-container">
                <div className="home-container-top">
                    <img src={photo} alt='' />
                </div>
                <div className="home-container-middle">
                    <p className="slogan">Empowering Care Through Seemless Documentation</p>
                </div>
                <div className="home-container-bottom">
                    <div className="home-container-bottom-desc-label">
                        <p>Efficient Healthcare Documentation</p>
                        <div className="home-container-bottom-desc-box">
                            <p>Say goodbye to paperwork and manual data entry. Our user-friendly platform empowers you to document patient information, treatment records, and medical histories with ease. We prioritize accuracy, security, and compliance at every step.</p>
                        </div>
                    </div>
                    <div className="home-container-bottom-desc-label">
                        <p>Streamlined Workflows</p>
                        <div className="home-container-bottom-desc-box">
                            <p>Our platform is designed to save you time and reduce administrative burdens. Navigate through patient records, update information, and collaborate seamlessly with your healthcare team. We are committed to making your work more efficient.</p>
                        </div>
                    </div>
                    <div className="home-container-bottom-desc-label">
                        <p>HIPAA Complient Security</p>
                        <div className="home-container-bottom-desc-box">
                            <p>Protecting sensitive patient data is non-negotiable. Rest assured, our platform adheres to the highest standards of data security and privacy, ensuring the confidentiality and integrity of patient information.</p>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
};

export default Home;