import React, { useState } from 'react';

import './Bar.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './ManageBar.css'
import $ from 'jquery';
import {Link , useNavigate } from 'react-router-dom';

function ManageBar()
{
    // const [ change , setChange ] = useState(0); 
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

    function account()
    {
        sessionStorage.setItem("search" , ""); 
        sessionStorage.setItem("tableName" , "account");
        window.location.reload();
        // setChange(1); 
        // setChange(0); 
    }

    function cart()
    {
        sessionStorage.setItem("search" , ""); 
        sessionStorage.setItem("tableName" , "cart");
        window.location.reload();
        // setChange(1); 
        // setChange(0); 
    }

    function chat()
    {
        sessionStorage.setItem("search" , ""); 
        sessionStorage.setItem("tableName" , "chat");
        window.location.reload();
        // setChange(1); 
        // setChange(0); 
    }

    function orders()
    {
        sessionStorage.setItem("search" , ""); 
        sessionStorage.setItem("tableName" , "orders");
        window.location.reload();
        // setChange(1); 
        // setChange(0); 
    }

    function product()
    {
        sessionStorage.setItem("search" , ""); 
        sessionStorage.setItem("tableName" , "product");
        window.location.reload();
        // setChange(1); 
        // setChange(0); 
    }
    return (//row ->> flex => justify-content: center;
    sessionStorage.getItem("Email") === 'yvette030717@gmail.com' /*&& change == 0*/ ? 
        <>
            <nav className="navbar navbar-expand-lg manage_nav">
                <div className="container-fluid">
                    <a className="navbar-brand" href='#'><span className="manage_nav-text manage_ndhu">Manage</span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='manage_username'> <div>Login as {sessionStorage.getItem("Name")}</div><a className="dropdown-item" href="/" onClick={logout}>Logout</a></div>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mx-auto">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#" onClick={account}><span className="manage_nav-text">Account</span></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href='#' onClick={cart}><span className="manage_nav-text">Cart</span></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href='#' onClick={chat}><span className="manage_nav-text">Chat</span></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href='#' onClick={orders}><span className="manage_nav-text">Orders</span></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href='#' onClick={product}><span className="manage_nav-text">Product</span></a>
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

export default ManageBar ;