import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import './index.css'

const HomePage = () => {

    const navigate = useNavigate();

    const onFindJob = () => {
        navigate("/jobs")
    }

    return (
        <div className="home-conatiner">
            <Header />
            <div className="home-page-container">
                <h2 className="home-page-head">Find The Job That Fits Your Life</h2>
                <p className="home-page-description">
                    Millions of people are searching for jobs, salary information,
                    company reviews. Find the job that fits your abilities and
                    potential.
                </p>
                <button className="find-job-btn" type="button" onClick={onFindJob}>Find Job</button>
            </div>
        </div>
    )
}

export default HomePage;