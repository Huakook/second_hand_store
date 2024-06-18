import React , { useState , useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import $ from 'jquery';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './AccountInfo.css';

export default function AccountInfo ()
{
    const [curImg , setCurImg] = useState(sessionStorage.getItem("Picture"));
    const [selectedImg , setSelectedImg] = useState(sessionStorage.getItem("Picture"));
    const [curName , setName] = useState(sessionStorage.getItem("Name")); 
    function selectImg( event )
    {
        const form = event.target; 
        //console.log(form.value);
        setSelectedImg(form.value);
    }
    function changeInfo( event )
    {
        event.preventDefault();
        const form = $( event.target ) ;
        const email = sessionStorage.getItem("Email"); 
        let form_data = form.serializeArray();
        form_data.push({ name: 'email' , value: email });
        console.log( form_data ) ;
        //console.log( id ) ;
        $.ajax({
            type:'GET',
            url: form.attr('action'),
            data: form_data, 
            success( res ){
                const r = JSON.parse( res );
                console.log( res );
                if( r["result"] === 1 )
                {
                    sessionStorage.setItem("Name" , r["name"]);
                    setName(r["name"]);
                    sessionStorage.setItem("Picture" , r["selectImg"]);
                    setCurImg(r["selectImg"]);
                    alert("Update Successfully !");
                }else if( r["result"] === 0 ){
                    alert("error !"); 
                }else if( r["result"] === 2 ){
                    alert("the product has been sold out or deleted...");
                }else if( r["result"] === 3 ){
                    alert("the remaining amount is less than the reqired amount.");
                }
            }
        });
    }
    return(
        <>
            <div className="conatainer">
            <div className='container mt-4'><h2>Account Info</h2><hr/></div>
                <div className="row">
                <div className="col-lg-4 col-md-5 col-sm-12"></div>
                    <div className="col-lg-4 col-md-5 col-sm-12 account_card">
                        <div className="card m-lg-3 m-md-3 m-sm-3">
                            <img src={require(`./photo/${curImg}`)} className="card-img-top" alt="Your shot"/>
                            <div className="card-body">
                                <h5 className="card-title">{curName}</h5>
                                <p className="card-text">{sessionStorage.getItem("Email")}</p>
                                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#accountInfo">Change Name/Password/Photo</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-5 col-sm-12"></div>
            </div>
            <div className="modal fade" id="accountInfo" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Change Account Info</h5>
                            </div>
                            <div className="modal-body">
                                <img src = { require(`./photo/${selectedImg}`)} className='img-fluid' alt="current chosen picture"/>
                                <small id="passwordHelp" className="form-text text-muted"></small>
                                <form action='http://localhost:8000/changeAccountInfo.php' method='get' onSubmit={ ( event ) => changeInfo( event ) }> 
                                    <div className="input-group flex-nowrap m-1">
                                        <input type="text" defaultValue={sessionStorage.getItem("Name")} className="form-control" id="UserName" name="UserName" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" required/> 
                                    </div>
                                    <div className="input-group flex-nowrap m-1">
                                        <input type="password" className="form-control" id="Password" name="Password" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" minLength={ 8 } maxLength={ 20 } pattern='[0-9a-zA-Z]+' required/> 
                                        <small id="passwordHelp" className="form-text text-muted">The length must be 8 to 20</small>
                                    </div>
                                    <div class="input-group flex-nowrap m-1">
                                        <div class="input-group-prepend">
                                            <button class="btn btn-outline-secondary" type="button">Image</button>
                                        </div>
                                        <select className='account_select' id="selectImg" name='selectImg' onChange={selectImg}>
                                            <option value="white.png" selected={curImg === "white.png" ? "selected":""}> white </option> 
                                            <option value="black.png" selected={curImg ==="black.png" ? "selected":""}> black </option> 
                                            <option value="lightPink.png" selected={curImg ==="lightPink.png" ? "selected":""}> light Pink </option> 
                                            <option value="lightBlue.png" selected={curImg ==="lightBlue.png" ? "selected":""}> light blue </option> 
                                            <option value="lightYellow.png" selected={curImg ==="lightYellow.png" ? "selected":""}> light yellow </option> 
                                            <option value="lightGreen.png" selected={curImg ==="lightGreen.png" ? "selected":""}> light green </option>
                                            <option value="lightPurple.png" selected={curImg ==="lightPurple.png" ? "selected":""}> light purple </option>  
                                            <option value="lightOrange.png" selected={curImg ==="lightOrange.png" ? "selected":""}> light orange </option> 
                                        </select>
                                    </div>
                                    <div className="modal-footer">                                                         
                                        <button type="submit" className="btn btn-primary">Update</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    </div>
                                </form> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
        </>
    )
}