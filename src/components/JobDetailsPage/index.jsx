import { useEffect, useState } from "react";
import { BsBriefcaseFill, BsStarFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import Cookies from "js-cookie";
import Header from './../Header/index'
import './index.css'
import { useParams } from "react-router-dom";
import Loader from "../Loader";

const constApiStatus = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}


const JobDetailsPage = () => {

    const {id} = useParams()

    const [jobDetails, setJobDetails] = useState({});
    const [apiStatus, setApiStatus] = useState(constApiStatus.initial);
    const [similarJobs, setSimilarJobs] = useState([]);

    useEffect(() => {
        getJobDetails();
    }, []);

    const getJobDetails = async () => {
        setApiStatus(constApiStatus.inProgress);
        const jwtToken = Cookies.get("jwt-token");
        const apiUrl = `https://apis.ccbp.in/jobs/${id}`;
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        };
        const response = await fetch(apiUrl, options);

        if (response.ok === true) {
            const data = await response.json();
            console.log(data)
            const updatedData = {
                id: data.job_details.id,
                title: data.job_details.title,
                companyLogoUrl: data.job_details.company_logo_url,
                employmentType: data.job_details.employment_type,
                jobDescription: data.job_details.job_description,
                location: data.job_details.location,
                packagePerAnnum: data.job_details.package_per_annum,
                rating: data.job_details.rating,
                skills: data.job_details.skills.map(skill => ({
                    name: skill.name,
                    imageUrl: skill.image_url,
                })),
                lifeAtCompany: {
                    description: data.job_details.life_at_company.description,
                    imageUrl: data.job_details.life_at_company.image_url,
                },
            };

            const updateSimilarJobs = data.similar_jobs.map(job => ({
                id: job.id,
                companyLogoUrl: job.company_logo_url,
                employmentType: job.employment_type,
                jobDescription: job.job_description,
                location: job.location,
                rating: job.rating,
                title: job.title
            }))
            setJobDetails(updatedData);
            setSimilarJobs(updateSimilarJobs);
            setApiStatus(constApiStatus.success);
        }else {
            setApiStatus(constApiStatus.failure);
        }
    }

    const renderJobContiner = () => {
        const { title, companyLogoUrl, employmentType, location, packagePerAnnum, rating, skills = [], lifeAtCompany, jobDescription } = jobDetails
        return <div className="job-details-container">
            <div className="job-logo-title-container">
                <img src={companyLogoUrl} alt="company logo" className="company-logo" />
                <div className="job-title-rating-container">
                    <h3 className="job-title">{title}</h3>
                    <div className="rating-container">
                        <BsStarFill size="20" className="star-icon" />
                        <p className="rating">{rating}</p>
                    </div>
                </div>
            </div>

            <div className="job-details-loaction-type-container">
                <div className="location-type-container">
                    <div className="location-container">
                        <MdLocationOn size={20} className="loctaion-iocn" />
                        <p className="location">{location}</p>
                    </div>
                    <div className="type-container">
                        <BsBriefcaseFill size={20} className="type-icon" />
                        <p className="job-type">{employmentType}</p>
                    </div>
                </div>
                <div className="salary-conatiner">
                    <p className="salary">{packagePerAnnum}</p>
                </div>
            </div>

            <hr />

            <div className="job-decription-container">
                <h3 className="description-title">Description</h3>
                <p className="description">{jobDescription}</p>
            </div>

            <div className="job-details-skills-conatiner">
                <h3 className="skill-title">Skills</h3>
                <ul className="skills-list-container">
                    {
                        skills?.map(skill => (
                            <li key={skill.name} className="skill-item">
                                <img src={skill.imageUrl} className="skill-logo" alt={skill.name} />
                                <h4 className="skill-name">{skill.name}</h4>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className="job-details-life-at-conatiner">
                <h3 className="life-at-title">Life at Company</h3>
                <div className="life-at-description-img-conatiner">
                    <p className="life-at-description">{lifeAtCompany?.description}</p>
                    <img src={lifeAtCompany?.imageUrl} className="life-at-description" alt="description" />
                </div>
            </div>
        </div>
    }

    const renderSimilarJobs = (job) => {
        const { id, title, jobDescription, location, rating, companyLogoUrl, employmentType } = job;

        return <li className="job-list-item-conatiner" key={id}>
            <div className="similar-job-companylogo-title-container">
                <div className="job-logo-title-container">
                    <img src={companyLogoUrl} alt="company logo" className="company-logo" />
                    <div className="job-title-rating-container">
                        <h3 className="job-title">{title}</h3>
                        <div className="rating-container">
                            <BsStarFill size="20" className="star-icon" />
                            <p className="rating">{rating}</p>
                        </div>
                    </div>
                </div>

                <div className="job-decription-container">
                    <h3 className="description-title">Description</h3>
                    <p className="description">{jobDescription}</p>
                </div>

                <div className="job-details-loaction-type-container" style={{paddingLeft:'0px'}}>
                    <div className="location-type-container">
                        <div className="location-container">
                            <MdLocationOn size={20} className="loctaion-iocn" />
                            <p className="location">{location}</p>
                        </div>
                        <div className="type-container">
                            <BsBriefcaseFill size={20} className="type-icon" />
                            <p className="job-type">{employmentType}</p>
                        </div>
                    </div>
                </div>

            </div>
        </li>
    }

      const renderFailureView = () => {
        return <div className="failure-container">
            <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure" className="failuer-logo" />
            <button type="button" className="failure-btn">Rentry</button>
        </div>
    }

    const renderPageViews = () => {
        switch(apiStatus) {
            case constApiStatus.inProgress : return <Loader />
            case constApiStatus.success : return renderJobContiner();
            case constApiStatus.failure : renderFailureView();
            default: return null;
        }
    }
    


    return (
        <>
            <Header />
            <div className="job-details-page-container">
               {renderPageViews() }
                <h3 className="simliar-job-title">Similar Jobs</h3>
                <ul className="similar-jobs-list">
                    {
                        similarJobs?.map(job => (
                            renderSimilarJobs(job)
                        ))
                    }
                </ul>

            </div>
        </>
    )
}

export default JobDetailsPage;