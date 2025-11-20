import './index.css'
import Header from '../Header'
import { BsSearch } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import AllJobs from '../AllJobs';
import Cookies from 'js-cookie';
import Loader from '../Loader';

// const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${'vinod'}&minimum_package=${'package'}&search=${'search'}`;

const employeeTypesList = [
    {
        label: 'Full Time',
        employeeTypeId: 'FULLTIME',
    },
    {
        label: 'Part Time',
        employeeTypeId: 'PARTTIME',
    },
    {
        label: 'Freelance',
        employeeTypeId: 'FREELANCE',
    },
    {
        label: 'Internship',
        employeeTypeId: 'INTERNSHIP',
    },
];

const salaryRangesList = [
    {
        salaryRangeId: '1000000',
        label: '10 LPA and above',
    },
    {
        salaryRangeId: '2000000',
        label: '20 LPA and above',
    },
    {
        salaryRangeId: '3000000',
        label: '30 LPA and above',
    },
    {
        salaryRangeId: '4000000',
        label: '40 LPA and above',
    },
];


const constJobsStatus = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const JobsPage = () => {

    const [jobList, setJobList] = useState([]);
    const [apiStatus, setApiStatus] = useState(constJobsStatus.initial);
    const [employmentTypeInput, setEmployementTypeInput] = useState('');
    const [minimumPackage, setMinimumPackage] = useState('');
    const [searchInput, setSeachInput] = useState('');


    console.log(employmentTypeInput, searchInput, minimumPackage)


    const onRetry = () => {
        setSeachInput('');
        setEmployementTypeInput('');
        setMinimumPackage('');
        getJobsInformation();
    }

    const getJobsInformation = async () => {

        setApiStatus(constJobsStatus.inProgress);
        const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeInput}&minimum_package=${minimumPackage}&search=${searchInput}`;
        const jwtToken = Cookies.get("jwt-token");
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }

        };

        const response = await fetch(jobsApiUrl, options);
        const data = await response.json();
        console.log(data);
        if (response.ok === true) {
            const updatedData = data.jobs.map(eachJob => ({
                id: eachJob.id,
                companyLogoUrl: eachJob.company_logo_url,
                employmentType: eachJob.employment_type,
                jobDescription: eachJob.job_description,
                packagePerAnnum: eachJob.package_per_annum,
                location: eachJob.location,
                rating: eachJob.rating,
                title: eachJob.title
            }));
            setJobList(updatedData);
            setApiStatus(constJobsStatus.success);
        } else {
            setApiStatus(constJobsStatus.failure);
        }
    }

    useEffect(() => {
        getJobsInformation();
    }, [employmentTypeInput, minimumPackage, searchInput]);

    const onSearch = evt => {
        setSeachInput(evt.target.value);
    }

    const onSalary = evt => {
        setMinimumPackage(evt.target.value);
        getJobsInformation()
    }

    const onEmploymentType = evt => {
        const id = evt.target.id;

        setEmployementTypeInput((prev) => {
            const updated = prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id];

            return updated;
        });

        setTimeout(() => getJobsInformation(), 0)
    }

    const onSearchBtn = evt => {
        if (evt.target.key === 'Enter')
            getJobsInformation();
    }

    const renderFailureView = () => {
        return <div className="failure-container">
            <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure" className="failuer-logo" />
            <button type="button" className="failure-btn" onClick={onRetry}>Retry</button>
        </div>
    }


    const renderSuccessView = () => {
        const noJob = jobList.length === 0;
        return (
            <>
                {
                    noJob ? (renderFailureView()) : (
                        <ul className="jobs-list-container">
                            {
                                jobList.map(eachJob => (
                                    <AllJobs key={eachJob.id} jobs={eachJob} />
                                ))
                            }
                        </ul>
                    )
                }
            </>
        )
    }

    const renderProfileFilterView = () => {
        return (
            <div className="profile-container">
                <img src="https://assets.ccbp.in/frontend/react-js/profile-img.png" alt="profile" />
                <h2 className="profile-name">Wade Warren</h2>
                <p className="profile-description">Software developer at UK</p>
            </div>
        )
    }

    const renderJobPage = () => (

        <div className="profile-container-and-filters">
            <div className="search-input-conatiner">
                <input type="search"
                    placeholder="Search"
                    className="search-input"
                    onChange={onSearch}
                    value={searchInput}
                />
                <button type="button" className="search-btn" onClick={onSearchBtn}>
                    <BsSearch className="search-icon" size="20" />
                </button>
            </div>
            {renderProfileFilterView()}
            <hr />
            <h3 className="employement-type-head">Type of Employment</h3>
            <ul className="employement-type-container-list">
                {
                    employeeTypesList.map(eachType => {
                        const { label, employeeTypeId } = eachType
                        return (
                            <li key={employeeTypeId} className="employement-type-item input-conatiner">
                                <input type="checkbox" id={employeeTypeId} onChange={onEmploymentType} value={employmentTypeInput} />
                                <label htmlFor={employeeTypeId} className="employement-type-label">{label}</label>
                            </li>
                        )
                    })
                }
            </ul>
            <hr />
            <ul className="salary-range-container">
                {
                    salaryRangesList.map(eachRange => {
                        const { salaryRangeId, label } = eachRange
                        return (
                            <li key={salaryRangeId} className="salary-range-item input-conatiner">
                                <input type="radio" id={salaryRangeId} name="salary" onChange={onSalary} value={salaryRangeId} />
                                <label htmlFor={salaryRangeId} className="salary-range-label">{label}</label>
                            </li>
                        )
                    }
                    )
                }
            </ul>
        </div>
      
    )

const renderThePage = () => {

    switch (apiStatus) {
        case constJobsStatus.inProgress: return <Loader />
        case constJobsStatus.success: return renderSuccessView();
        // case constJobsStatus.failure: return renderFailureView()
        default: return;
    }
}

return (
    <div className="jobs-page-container">
        <Header />
        <div className="jobs-content-container">
            {renderJobPage()}
            {renderThePage()}
        </div>
    </div>
)
}

export default JobsPage;