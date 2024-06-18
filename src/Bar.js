import React, { useState } from 'react';

import './Bar.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from 'jquery';
import {Link} from 'react-router-dom';

function Bar()
{
    // const [ search , setSearch ] = useState("init"); 
    function logout()
    {
        console.log(sessionStorage.getItem("Log"));
        sessionStorage.clear(); 
        // console.log(sessionStorage.getItem("Log"));
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        }
    }
    function _search( event )
    {
        // const form = $( event.target );
        // const data = form.serialize();  
        // console.log( data ); 
        const data = $("#search").val();
        sessionStorage.setItem("search" , data ); 
        // setSearch( data ); 
    }
    // console.log( sessionStorage.getItem("search") ); 
    // console.log( search ); 
    // sessionStorage.setItem("search" , "");
    return (//row ->> flex => justify-content: center;
    sessionStorage.getItem("Log") === 'Y'?
        <>
            <nav className="navbar navbar-expand-lg nav_">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/Home'><span className="nav-text ndhu">NDHU</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <span className='username'>Login as {sessionStorage.getItem("Name")}</span>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mx-auto">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/Home"><span className="nav-text">Home</span></a>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to='./Cart' onClick={() => (sessionStorage.setItem("search" , ""))}><span className="nav-text">Cart</span></Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to='./MyOrder' onClick={() => (sessionStorage.setItem("search" , ""))}><span className="nav-text">MyOrder</span></Link>
                        </li>
                        <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="nav-text">
                                About
                            </span>
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/MyShop" onClick={() => (sessionStorage.setItem("search" , ""))}>MyShop</Link></li>
                            {/* <li><Link className="dropdown-item" to="/Chat" onClick={() => (sessionStorage.setItem("search" , ""))}>Chat</Link></li> */}
                            <li><Link className="dropdown-item" to="/AccountInfo" onClick={() => (sessionStorage.setItem("search" , ""))}>Account Info</Link></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><Link className="dropdown-item" to="/" onClick={logout}>Logout</Link></li>
                        </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" onSubmit={_search}>
                        <input className="form-control me-2" id="search" type="search" placeholder="Search" aria-label="Search" defaultValue={sessionStorage.getItem("search")}/>
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                    </div>
                </div>
            </nav>
        </>:<></>
    );
}

export default Bar ;