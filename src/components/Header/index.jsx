import {  NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import './index.css'

const Header = () => {

    const navigate = useNavigate();

    const onLogout = () => {
        Cookies.remove('jwt-token');
        navigate("login", { replace: true });
    }

    return (
        <div className="header-container">
            <nav className="navbar">
                <NavLink to={"/"} className={"nav-link"}>
                    <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="website logo" className="logo-img" />
                </NavLink>
                <ul className="nav-links">
                    <NavLink to={"/"} className="nav-link">
                        <li className="nav-link-item">Home</li>
                    </NavLink>
                    <NavLink to={"/jobs"} className="nav-link" >
                        <li className="nav-link-item">Jobs</li>
                    </NavLink>
                </ul>
                <button type="button" className="logout-btn" onClick={onLogout}>Logout</button>
            </nav>
        </div>
    )
}

export default Header