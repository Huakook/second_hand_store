import React from 'react';
import './Bar.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Home.css'
import {Link} from 'react-router-dom';

function Bar()
{
    return (//row ->> flex => justify-content: center;
        <>
            <nav className="navbar navbar-expand-lg nav_">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/Home'><span className="nav-text ndhu">NDHU</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mx-auto">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/Home"><span className="nav-text">Home</span></a>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to='./Cart'><span className="nav-text">Cart</span></Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to='./MyOrder'><span className="nav-text">MyOrder</span></Link>
                        </li>
                        <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="nav-text">
                                About
                            </span>
                        </Link>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="/MyShop">MyShop</a></li>
                            <li><a className="dropdown-item" href="/Chat">Chat</a></li>
                            <li><a className="dropdown-item" href="/AccountInfo" onClick={Logout}>Account Info</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="/">Logout</a></li>
                        </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

function Logout()
{
    sessionStorage.setItem("Log" , 'N');
}

export default Bar ;