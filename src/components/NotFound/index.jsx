import { useNavigate } from 'react-router-dom'
import './index.css'

const NotFound = () => {

    const navigate =  useNavigate()

    const onRetry = () => {
        navigate("/jobs");
    }

    return <div className="notfound-page-container">
        <div className="notfound-conatiner">
            <img src = "https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="notfound" className="notfound-img" />
            <button type="button" className="btn" onClick={onRetry}>Retry</button>
        </div>
    </div>
}

export default NotFound;