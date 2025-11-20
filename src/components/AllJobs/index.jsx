import { BsBriefcaseFill, BsStarFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import './index.css';
import { Link, useParams } from "react-router-dom";

const AllJobs = (props) => {
    const { jobs } = props;
    const { id, title, companyLogoUrl, employmentType, jobDescription, location, packagePerAnnum, rating } = jobs;

    return (
        <Link to={`/jobs/${id}`} className="nav-link">
            <li className="job-item">
                <div className="job-item-head">
                    <div className="job-item-body">
                        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
                        <div className="job-title-rating-container">
                            <h3 className="job-title">{title}</h3>
                            <div className="rating-container">
                                <BsStarFill className="star-icon" size="20" />
                                <p className="rating-text">{rating}</p>
                            </div>
                        </div>
                    </div>
                    <div className="job-item-details">
                        <div className="location-employement-type-container">
                            <div className="location-container">
                                <MdLocationOn className="location-icon" size="20" />
                                <p className="location-text">{location}</p>
                            </div>
                            <div className="employement-type-container">
                                <BsBriefcaseFill className="employement-type-icon" size="20" />
                                <p className="employement-type-text">{employmentType}</p>
                            </div>
                        </div>
                        <p className="package-text">{packagePerAnnum}</p>
                    </div>
                    <hr />
                    <h3 className="job-description-head">Description</h3>
                    <p className="job-description-text">{jobDescription}</p>
                </div>
            </li>
        </Link>
    )
}

export default AllJobs;