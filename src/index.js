import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter , Routes, Route, useNavigate } from 'react-router-dom';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from 'jquery';
import Home from './Home';
import Cart from './Cart';
import MyOrder from './MyOrder';
import MyShop from './MyShop';
import AccountInfo from './AccountInfo';
import Chat from './Chat';
import Bar from './Bar';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Bar/>
        <Routes>      
              <Route path ='/' element={<Index/>}/>
              <Route path='/Home' element={<Home/>}/>
              <Route path='/Cart' element={<Cart/>}/>
              <Route path='/MyOrder' element={<MyOrder/>}/>
              <Route path='/MyShop' element={<MyShop/>}/>
              <Route path='/AccountInfo' element={<AccountInfo/>}/>
              <Route path='/Chat' element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

function Index()
{
    const [ page , setPage ] = useState(<Login/>);
    const [ ID , setID ] = useState( -1 );// -1 ->> verification is availabe 
    const Navigate = useNavigate();

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
                const r = JSON.parse( res ) ;//Converts a JSON string into an object. 
                if( r["result"] === false )// if{"XXX":123} then must access the object with "XXX" not 'XXX' 
                {
                    alert('The email account has been registered !');
                    setPage(<Login/>);
                }else{
                    sessionStorage.setItem("Email" , r["Email"] ) ;
                    sessionStorage.setItem("Name" , r["Name"] ) ;
                    sessionStorage.setItem("Password" , r["Password"] ) ;
                    sessionStorage.setItem("Picture" , r["Picture"] ) ;
                    sessionStorage.setItem("Code" , r["Code"] ) ;
                }
            }
        })
        setID( setTimeout( () => ( verificationTimeOut() ) , 120000 ) ); 
        //disable the forward button 
        window.history.pushState(null, null, window.location.href);
//        window.onpopstate = function(event) {
//          window.history.pushState(null, null, window.location.href);
//        };
    }
    function verificationTimeOut()
    {
        setPage(<Register/>);
        setID( -1 );  
    }
    function phpVerify( event ) 
    {
        clearTimeout( ID );
        event.preventDefault();
        const form = $( event.target );
        let form_data = form.serializeArray();
        form_data.push({ name: 'Email', value: sessionStorage.getItem("Email") } , { name: 'Name', value: sessionStorage.getItem("Name") } , { name: 'Password', value: sessionStorage.getItem("Password") } , { name: 'Picture', value: sessionStorage.getItem("Picture") } , { name: 'Code', value: sessionStorage.getItem("Code") } );
        console.log( form_data );
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form_data,
            success( res )
            {
                console.log( res ) ;
                const r = JSON.parse( res );
                if( r["result"] === 0 )
                {
                    alert('The code is wrong !');
                }else if( r["result"] === 1 ) {
                    alert('Verified successfully !')
                    setPage(<Login/>);     
                }else{
                    alert('sql error !');          
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
        <form className='_form' action='http://localhost:8000/phpRegister.php' method='post' onSubmit={ ( event ) => phpRegister( event ) }>
        <div className="form-group">
          <label className='labelText'>Name</label>
          <input className='inputText form-control' type="text" id="Name" name='Name' aria-describedby="nameHelp" placeholder="Enter name" pattern="[^'\\\x22;]*" maxLength={10} required/>
          <small id="nameHelp" className="form-text text-muted"> This will be public to everyone ; length less than 10</small> 
        </div>
        <div className="form-group">
          <label className='labelText'>Picture Color</label> 
          <br/>
          <select name='Picture'>
            <option> white </option> 
            <option> black </option> 
            <option> light Pink </option> 
            <option> light blue </option> 
            <option> light yellow </option> 
            <option> light green </option>
            <option> light purple </option>  
            <option> light orange </option> 
          </select>
          <small id="passwordHelp" className="form-text text-muted"></small>
        </div>
        
        <div className="form-group">
          <label className='labelText'>Email address</label>
          <input className='inputText form-control' type="email" id="Email" name='Email' aria-describedby="emailHelp" placeholder="Enter email" pattern='[0-9a-zA-Z]+@gms.ndhu.edu.tw' maxLength={ 30 } required/>
          <small id="emailHelp" className="form-text text-muted"> several letters and digits followed by @gms.ndhu.edu.tw </small>
        </div>
        <div className="form-group">
          <label className='labelText'>Password</label> 
          <input className='inputText form-control' type="password" id="Password" name='Password' aria-describedby="passwordHelp" placeholder="Enter password" minLength={ 8 } maxLength={ 20 } pattern='[0-9a-zA-Z]+' required/>
          <small id="passwordHelp" className="form-text text-muted">The length must be 8 to 20</small>
        </div>
        <button type="submit" className="btn btn-secondary">Get Verification Code</button>
      </form>
      );
    }

    function phpLogin( event )
    {
        event.preventDefault();
        const form = $( event.target ) ;
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form.serialize(),
            success( res )
            {
                console.log( res ) ;
                const r = JSON.parse( res );
                if( r["result"] === 0 )
                {
                    alert('Wrong Email or Password !');
                }else{
                    Navigate('/Home');
                }
            }
        })
    }
    
    function Login()
    {
      return(
        <form className='_form' action='http://localhost:8000/phplogin.php' method='post' onSubmit={ ( event ) => phpLogin( event ) }>
          <div className="form-group">
            <label className='labelText'>Email address</label>
            <input className='inputText form-control' type="email" id="Email" name='Email' placeholder="Enter email"/>
          </div>
          <div className="form-group">
          <label className='labelText'>Password</label> 
          <input className='inputText form-control' type="password" id="Password" name='Password' aria-describedby="passwordHelp" placeholder="Enter password" minLength={ 8 } maxLength={ 20 } pattern='[0-9a-zA-Z]+' required/>
          <small id="passwordHelp" className="form-text text-muted btn btn-link" onClick={ toForget }>forget password?</small>
        </div>
          <button type="submit" className="btn btn-secondary">Login</button>
        </form>
      );
    }

    function Forget()
    {
      return(
        <form className='_form'>
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
        <form className='_form' action='http://localhost:8000/verification.php' method='post' onSubmit={ ( event ) => phpVerify( event ) }>
          <div className="form-group">
            <label className='labelText'>Verification Code</label>
            <input className='inputText form-control' type="code" id="VerificationCode" name='VerificationCode' aria-describedby="codeHelp" placeholder=""/>
            <small id="codeHelp" className="form-text text-muted"> Please check your Gmail inbox. Note: The verification code will be expired after 2 minutes ! and the page will be redirected. </small>
          </div>
          <button type="submit" className="btn btn-secondary">Submit</button>
        </form>
      );
    }
}

//setTimeout( () => ( root.render( <Home/> ) ) , 3000 ) ; 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
