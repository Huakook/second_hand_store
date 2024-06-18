import React , { useState , useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import $ from 'jquery';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Cart.css';

export default function Cart ()
{ 
    const [ products , setProducts ] = useState([]);//[] is array( string ) which can use .map(); {} is for object which only has foreach method 
    const [ product , setProduct ] = useState({
        AID: 0,
        PID: 0 ,
        CID: 0,
        amount: 0,
        image: "",
        name: "",
        price: 0,
    });//don't use {} !!! 
    //query the cart data 
    function catchData()
    { 
        var venderNumber = 0 ; 
        var venderID = 0 ;
        $.ajax({
            type:'GET',
            url: 'http://localhost:8000/queryCart.php',
            data: {'email': sessionStorage.getItem("Email") }, 
            dataType: 'json', 
            success( res ){
                //console.log( res );
                const arr = Object.values( res );// Returns an array of values of the enumerable properties of an object
                setProducts( arr ) ; //no need to JSON => parse
            }
        });
    }
    // Trigger the function when the component mounts
    useEffect(() => {
        catchData();
    }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

    function showModal( event )
    {
        event.preventDefault();
        const target = $( event.target );
        const _id = target.attr("value");
        //console.log( _id ) ;
        $.ajax({
            type:'GET',
            url: 'http://localhost:8000/queryAProduct.php',
            data: {'id': _id }, 
            dataType: 'json',
            success( res ){
                //console.log( res );
                setProduct( res ) ; //no need to JSON => parse
            }
        });
        //op(); 
    }

    function editCart( event )
    {
        event.preventDefault();
        const form = $( event.target ) ;
        const email = sessionStorage.getItem("Email"); 
        let form_data = form.serializeArray();
        form_data.push({name: 'pid' , value: product.PID }, { name: 'email' , value: email });
        //console.log({ name: 'pid' , value: product.PID  }); 
        //console.log( form_data ) ;
        //console.log( id ) ;
        $.ajax({
            type:'GET',
            url: form.attr('action'),
            data: form_data, 
            success( res ){
                const r = JSON.parse( res );
                //console.log( res );
                if( r["result"] === 1 )
                {
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
        catchData();
    }

    function delete_cart( event )
    {
        event.preventDefault();
        const target = $( event.target );
        const _id = target.attr("value");
        //console.log( _id ) ;
        $.ajax({
            type:'GET',
            url: 'http://localhost:8000/deleteCart.php',
            data: { cid :_id } , 
            dataType: 'json',
            success( res ){ 
                //console.log( res );
            }
        }); 
        catchData();  
    } 

    function deleteCart( event )
    {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this item from the cart ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => delete_cart( event )
              },
              {
                label: 'No',
                //onClick: () => alert('Click No')
              }
            ]
          });
            //op(); 
    }

    function check_out( event )
    {
        event.preventDefault();
        const target = $( event.target );
        const _id = target.attr("value");
        $.ajax({
            type:'GET',
            url: 'http://localhost:8000/checkout.php',
            data: { cid : _id }, 
            dataType: 'json',
            success( res ){ 
                //console.log( res );
                const r = JSON.parse( res );
                if( r["result"] === 1 )
                {
                    alert("Checkout Successfully !");
                }else if( r["result"] === 0 ){
                    alert("error !"); 
                }else if( r["result"] === 2 ){
                    alert("the product has been sold out or deleted...");
                }else if( r["result"] === 3 ){
                    alert("the remaining amount is less than the required amount.");
                }
            }
        });
        setTimeout(() => {
            afterCheckOut( event );
        }, 100 ); 
    } 

    function checkOut( event )
    {
        confirmAlert({
            title: 'Confirm to checkout',
            message: 'After you checkout, we will send a request to the vendor and once the vendor confirm your order, he/she will get your account name, and then you can chat with each other.',
            buttons: [
              {
                label: 'Checkout',
                onClick: () => check_out( event )
              },
              {
                label: 'Cancel',
                //onClick: () => alert('Click No')
              }
            ]
          });
    }
    function afterCheckOut( event )
    {
        delete_cart(event);          
        catchData();  
    }
    var venderNumber = 0 ; 
    var venderID = 0 ;
    return(//container ->> in center; row ->> next row 
    <>  
        {products.length !== 0 ?
        
            <div className='container container_size mt-4'>
                <div className='container mt-4'><h2>Your Cart</h2><hr/></div>
                <div className="row">
                    {
                        products.map(( p , index ) => (//it's horizontal ->> col-md2 ->> height:2/12
                            <div className="card mb-3" key={index}>
                                {venderID !== p.AID && p.name.includes( sessionStorage.getItem("search") ) ?  <div className='container mt-4'><h5>Vender { venderNumber = venderNumber + 1 }</h5><hr/><div hidden>{ venderID = p.AID }</div></div> :<></>}
                                <div className="row no-gutters">
                                    <div className="col-md-2">
                                        <img src={require(`./photo/${p.image}`)} className="img-fluid cart_img" alt="..."/>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card-body">
                                            <h3 className="card-title">{p.name}</h3>
                                            <p className="card-text"></p>
                                            <button className="btn card-link btn-link p-0"> vendor </button>
                                            <button value={p.PID} className="btn card-link btn-link p-0" data-bs-toggle="modal" data-bs-target="#fullDescription" onClick={ showModal }>More details</button>
                                            <p className="card-text"><small className="text-muted">#</small></p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card-body">
                                        <h5 className="card-title">Amount</h5>
                                            <p className="card-text">* {p.amount}</p>
                                            <h5 className="card-title">Price</h5>
                                            <p className="card-text">Total price: { p.price * p.amount }{" "}NT$ </p>
                                            <p className="card-text"><small className="text-muted">{ p.price } * { p.amount } = { p.price * p.amount }</small></p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="card-body">
                                            <button value={p.PID} className="btn btn-primary _btn mt-lg-3 ms-sm-2" data-bs-toggle="modal" data-bs-target="#editCart" onClick={ showModal }>Edit</button>
                                            <button value={p.CID} className='btn btn-success _btn mt-lg-3 ms-sm-2' onClick={ deleteCart }>Delete</button>
                                            <button value={p.CID} className='btn btn-danger _btn mt-lg-3 ms-sm-2' onClick={ checkOut }>Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))    
                    }            
                        <div className="modal fade" id="editCart" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">{product.name}</h5>
                                    </div>
                                    <div className="modal-body">
                                        <img src = { product.image === '' ? "" : require( `./photo/${product.image}` ) } className='img-fluid' alt={product.description}/>
                                        <div> price: { product.price } {' '} NT$ </div>
                                        <div> remaining: { product.amount } </div>
                                        
                                        <form action='http://localhost:8000/editCart.php' method='get' onSubmit={ ( event ) => editCart( event ) }>
                                            <select className="form-select form-select-sm" aria-label=".form-select-sm example" id='amountSelect' name='amountSelect'>
                                                {product.amount >= 1 ? <option>{1}</option>:<></>}
                                                {product.amount >= 2 ? <option>{2}</option>:<></>}
                                                {product.amount >= 3 ? <option>{3}</option>:<></>}
                                                {product.amount >= 4 ? <option>{4}</option>:<></>}
                                                {product.amount >= 5 ? <option>{5}</option>:<></>}
                                                {product.amount >= 6 ? <option>{6}</option>:<></>}
                                                {product.amount >= 7 ? <option>{7}</option>:<></>}
                                                {product.amount >= 8 ? <option>{8}</option>:<></>}
                                                {product.amount >= 9 ? <option>{9}</option>:<></>}
                                                {product.amount >= 10 ? <option>{10}</option>:<></>}
                                                {product.amount >= 11 ? <option>{11}</option>:<></>}
                                                {product.amount >= 12 ? <option>{12}</option>:<></>}
                                                {product.amount >= 13 ? <option>{13}</option>:<></>}
                                                {product.amount >= 14 ? <option>{14}</option>:<></>}
                                                {product.amount >= 15 ? <option>{15}</option>:<></>}
                                                {product.amount >= 16 ? <option>{16}</option>:<></>}
                                                {product.amount >= 17 ? <option>{17}</option>:<></>}
                                                {product.amount >= 18 ? <option>{18}</option>:<></>}
                                                {product.amount >= 19 ? <option>{19}</option>:<></>}
                                                {product.amount >= 20 ? <option>{20}</option>:<></>}
                                            </select>
                                            <div className="modal-footer">                                                         
                                                <button value={product.PID} type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" id="fullDescription" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">{product.name}</h5>
                                    </div>
                                    <div className="modal-body">
                                        <img src = { product.image === '' ? "" : require( `./photo/${product.image}` ) } className='img-fluid' alt={product.description}/>
                                        <div> Remaining: { product.amount } </div>
                                        <div> Condition: { product.condition } </div>
                                        <div> Price: { product.price } </div>
                                        <div> Year: { product.year } </div>
                                        <div> Description: { product.description } </div>
                                        <form action='http://localhost:8000/addToCart.php' method='get' onSubmit={ ( event ) => ( event ) }>
                                            <div className="modal-footer">                                       
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>        
            </div>
        :<div className='container'><div className='empty cart_center'>Your Cart is Empty.</div></div>}
    </>
    );
}