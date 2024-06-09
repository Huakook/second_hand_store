import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from 'jquery';

const root = ReactDOM.createRoot(document.getElementById('root'));

var login = false ; 
root.render(
  <React.StrictMode>
    <Index/>
  </React.StrictMode>
);

function Index()
{
    const [ page , setPage ] = useState(<Login/>);
    const [ ID , setID ] = useState( -1 );
    function toLogin()
    {
        setPage(<Login/>);
    }
    function toRegister()
    {
        setPage(<Register/>);
    }
    function toForget()
    {
        setPage(<Forget/>);
    }
    function phpRegister( event )
    {
        if( ID !== -1 )
        {
            alert('try again later!');
            return;
        }
        setPage(<Verification/>); 
        event.preventDefault();
        const form = $ ( event.target ); //return the DOM that triggers the event 
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form.serialize(), //Serialize a form to a query string that could be sent to a server in an Ajax request
            success( res ) 
            {
                console.log( res ) ; 
            }
        })
        setID( setTimeout( () => ( verificationTimeOut() ) , 60000 ) ); 
    }
    function verificationTimeOut()
    {
        setPage(<Register/>);
        setID( -1 );  
    }
    function verify( event ) 
    {
        clearTimeout( ID );
        event.preventDefault();
        const form = $( event.target );
        $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            success( res )
            {
                if( res['result'] === 0 )
                {
                    alert('The code is wrong !');
                }else{
                    alert('Verified successfully !')
                    setPage(<Login/>);
                }
            }
        })
    }

    return(
        <div className='wrapper'>
          <div className='bar'>
            <button className='btn btn-lg' onClick={ toLogin }> <span className='barItem'> Login </span></button>
            <button className='btn btn-lg' onClick={ toRegister }> <span className='barItem'> Register </span> </button>
          </div>
          {page}
        </div>     
    );

    function Register()
    {
      return(
        <form className='padding' action='http://localhost:8000/phpRegister.php' method='post' onSubmit={ ( event ) => phpRegister( event ) }>
        <div className="form-group">
          <label className='labelText'>Name</label>
          <input className='inputText form-control' type="text" id="Name" name='Name' aria-describedby="nameHelp" placeholder="Enter name" pattern="[^'\\\x22;]*" required/>
          <small id="nameHelp" className="form-text text-muted"> This will be public to everyone </small> 
        </div>
        <div className="form-group">
          <label className='labelText'>Email address</label>
          <input className='inputText form-control' type="email" id="Email" name='Email' aria-describedby="emailHelp" placeholder="Enter email" pattern='[0-9a-zA-Z]+@gms.ndhu.edu.tw' required/>
          <small id="emailHelp" className="form-text text-muted"> several letters and digits followed by @gms.ndhu.edu.tw </small>
        </div>
        <div className="form-group">
          <label className='labelText'>Password</label> 
          <input className='inputText form-control' type="password" id="Password" name='Password' aria-describedby="passwordHelp" placeholder="Enter password" minLength={ 8 } maxLength={ 20 } pattern='[0-9a-zA-Z]+' required/>
          <small id="passwordHelp" className="form-text text-muted">The length must be 8 to 20</small>
        </div>
        <button type="submit" className="btn btn-secondary">Submit</button>
      </form>
      );
    }
    
    function Login()
    {
      return(
        <form className='padding'>
          <div className="form-group">
            <label className='labelText'>Email address</label>
            <input className='inputText form-control' type="email" id="Email" name='Email' placeholder="Enter email"/>
          </div>
          <div className="form-group">
          <label className='labelText'>Password</label> 
          <input className='inputText form-control' type="password" id="Password" name='Password' aria-describedby="passwordHelp" placeholder="Enter password" minLength={ 8 } maxLength={ 20 } pattern='[0-9a-zA-Z]+' required/>
          <small id="passwordHelp" className="form-text text-muted btn btn-link" onClick={ toForget }>forget password?</small>
        </div>
          <button type="submit" className="btn btn-secondary">Submit</button>
        </form>
      );
    }

    function Forget()
    {
      return(
        <form className='padding'>
          <div className="form-group">
            <label className='labelText'>Email address</label>
            <input className='inputText form-control' type="email" id="Email" name='Email' aria-describedby="emailHelp" placeholder="Enter email" pattern='[0-9a-zA-Z]+@gms.ndhu.edu.tw' required/>
            <small id="emailHelp" className="form-text text-muted"> several letters and digits followed by @gms.ndhu.edu.tw </small>
          </div>
          <button type="submit" className="btn btn-secondary">get verification code</button>
        </form>
      );
    }

    function Verification()
    {
      return(
        <form className='padding' action='http://localhost:8000/verification.php' method='post' onSubmit={ ( event ) => verify( event ) }>
          <div className="form-group">
            <label className='labelText'>Verification Code</label>
            <input className='inputText form-control' type="code" id="VerificationCode" name='VerificationCode' aria-describedby="codeHelp" placeholder=""/>
            <small id="codeHelp" className="form-text text-muted"> Please check your Gmail inbox. Note: The verification code will be expired after 1 minute ! and the page will be redirected. </small>
          </div>
          <button type="submit" className="btn btn-secondary">Submit</button>
        </form>
      );
    }
}

if( login === true )
{
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

//setTimeout( () => ( root.render( <Home/> ) ) , 3000 ) ; 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
