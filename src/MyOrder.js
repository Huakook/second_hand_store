import React , { useState , useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import $ from 'jquery';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './MyOrder.css';

export default function MyOrder ()
{
    const [ orders , setOrders ] = useState([]);//[] is array( string ) which can use .map(); {} is for object which only has foreach method 
    const [ fileBlob, setFileBlob] = useState(null);
    const [ chat , setChat] = useState([]); 
    const [ cusName , setCusName ] = useState("cn");
    const [ cusPicture , setCusPicture ] = useState("cp");
    const [ vName , setVName ] = useState("vn");
    const [ vPicture , setVPicture ] = useState("vp");
    const [ isShow , setIsShow ] = useState(false); 
    const [ status , setStatus ] = useState(""); 
    const [ product , setProduct ] = useState({
        PID: 0, 
        name: '', 
        AID: 0, 
        image: '', 
        condition: '', 
        price: 0, 
        year: 0, 
        amount: 0, 
        description: '', 
    });
    const [ orderStatus , setOrderStatus ] = useState("");
    //query the order data 
    function catchData()
    { 
        venderNumber = 0 ; 
        venderID = 0 ;
        $.ajax({
            type:'GET',
            url: 'http://localhost:8000/queryOrders.php',
            data: {'email': sessionStorage.getItem("Email") }, 
            dataType: 'json', 
            success( res ){
                // console.log( res );
                console.log("catchData"); 
                const arr = Object.values( res );// Returns an array of values of the enumerable properties of an object 
                setOrders( arr ) ; //no need to JSON => parse
            }
        });
    }
    // Trigger the function when the component mounts
    useEffect(() => {
        catchData();
    }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount
    
    function catchChat( oid )
    { 
        sessionStorage.setItem("OID" , oid ); 
        $.ajax({
            type:'GET',
            url: 'http://localhost:8000/queryChat.php',
            data: {OID: oid}, 
            dataType: 'json', 
            success( res ){
                console.log( res );
                const arr = Object.values( res );// Returns an array of values of the enumerable properties of an object
                setChat( arr ) ; //no need to JSON => parse
            }
        });
    }

    function catchChatAID( oid )
    {
        $.ajax({
            type:'GET',
            url: 'http://localhost:8000/queryChatAID.php',
            data: {OID: oid}, 
            dataType: 'json', 
            success( res ){
                //console.log( res );
                //const r = JSON.stringify( res ) 
                //console.log( res["cusName"] ); 
                setCusName( res["cusName"] );
                setCusPicture( res["cusPicture"] );
                setVName( res["vName"] );
                setVPicture( res["vPicture"] ); 
            }
        });
        //setState is asynchornous
        //console.log( cusName );
        //console.log( cusPicture ); 
        //console.log( vName ); 
        //console.log( vPicture ); 
    }

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

    function cancel_order( event )
    {
        event.preventDefault();
        const target = $( event.target );
        const _id = target.attr("value");
        //console.log( _id ) ;
        $.ajax({
            type:'GET',
            url: 'http://localhost:8000/cancelOrder.php',
            data: { oid :_id } , 
            dataType: 'json',
            success( res ){ 
                //console.log( res );
                //const r = JSON.parse( res );
                if( res["result"] === 0 )
                {
                    alert("You cannot cancel/deleted the accepted/finished order !"); 
                }
            }
        }); 
        catchData(); 
    } 
    
    function cancelOrder( event )
    {
        confirmAlert({
            title: 'Confirm to Cancel/Delete Order',
            message: 'Are you sure to cancel/delete this order ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => cancel_order( event )
              },
              {
                label: 'No',
                //onClick: () => alert('Click No')
              }
            ]
          });
            //op(); 
    }

    function _chat( event )
    {
        setIsShow( true ); 
        const form = $( event.target ) ; 
        const _OID = form.attr("value"); 
        //console.log( VenderID ); 
        catchChat(_OID);
        catchChatAID(_OID);  
        // setTimeout(() => {
        //     //console.log( chat["result"] ); 
        // }, 3000); 
        // const scroll = $("#scroll"); 
        // const element = document.getElementById('scroll');
        // scroll.scrollTop(element.outerHeight); 
        // console.log(element.scrollHeight); 
    }

    function fileInputChange( event )
    {
        const file = event.target.files[0];
        setFileBlob( file ); 
    }

    function sendMessage( event )
    {
        event.preventDefault();
        const form = $( event.target ) ;
        let form_data = form.serializeArray();
        form_data.push({ name: 'cname' , value: cusName } , { name: 'vname' , value: vName }, { name: 'sender' , value: 'C' });
        //console.log( form_data ) ;
        //console.log( id ) ;
        event.target.reset();
        $.ajax({
            type:'GET',
            url: form.attr('action'),
            data: form_data, 
            success( res ){
                //const r = JSON.parse( res );
                console.log( res );
                if( res["result"] === 1 )
                {
                    //alert("Add Sucessfully !");

                }else if( res["result"] === 0 ){
                    alert("error !"); 
                }
            }
        });
        const _OID = sessionStorage.getItem("OID"); 
        catchChat(_OID);
        catchChatAID(_OID);  
        setTimeout(() => {
            //console.log( chat["result"] ); 
        }, 3000);       
        /*
        window.location.reload();
        setIsShow(false);
        catchChat(); 
        setTimeout(() => {
             setIsShow(true); 
        }, 2000);  */
    }

    function vp()
    {
        return require(`./photo/${vPicture}`);
    }
    // console.log(sessionStorage.getItem("search"));
    var venderNumber = 0 ; 
    var venderID = 0 ;
    return(
        <>
        {orders.length !== 0 ?
        (<div className='container mt-4'>
            <div className='container mt-4'>
                <h2>
                    My Orders
                    <button className='btn btn-link ms-1' onClick={ () => setStatus("")}>All</button>
                    <button className='btn btn-link ms-1' onClick={ () => setStatus("requested")}>Requested</button>
                    <button className='btn btn-link ms-2' onClick={ () => setStatus("accepted")}>Accepted</button>
                    <button className='btn btn-link ms-2' onClick={ () => setStatus("rejected")}>Rejected</button>
                </h2>
                <hr/>
            </div>
            <div className="row">
            {
                orders.map(( o , index ) => (//it's horizontal ->> col-md2 ->> height:2/12
                o.status.includes( status )?
                <div className="dropdown" key={index}>
                    { o.name.includes( sessionStorage.getItem("search") ) ? <div className="btn btn-secondary dropdown-toggle card mb-3" key={index} type="button" id="dropdownOrderButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {venderID !== o.VID? <div className='container mt-4'><h5>Vender { venderNumber = venderNumber + 1 }</h5><hr/><div hidden>{ venderID = o.VID }</div></div> :<></>}
                        <div className="row no-gutters">
                            <div className="col-md-2">
                                <img src={require(`./photo/${o.image}`)} className="img-fluid cart_img" alt="..."/>
                            </div>
                            <div className="col-md-4">
                                <div className="card-body">
                                    <h3 className="card-title">{o.name}</h3>
                                    <p className="card-text"></p>
                                    <button value={o.PID} className="btn card-link btn-link p-0">Click the order for More details</button>
                                    <p className="card-text"><small className="text-muted">Order Date{": "}{o.date}</small></p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card-body">
                                <h5 className="card-title">Amount</h5>
                                    <p className="card-text">* {o.amount}</p>
                                    <h5 className="card-title">Price</h5>
                                    <p className="card-text">Total price:  { o.price * o.amount } NT$</p>
                                    <p className="card-text"><small className="text-muted">{ o.price } * { o.amount } = { o.price * o.amount }</small></p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card-body">
                                <h5 className="card-title">Amount</h5>
                                    { o.status === "finished" && <button className='btn btn-primary _btn mt-lg-3 ms-sm-2'>Finished</button> }
                                    { o.status === "rejected" && <button className='btn btn-success _btn mt-lg-3 ms-sm-2'>Rejected</button>}
                                    { o.status === "requested" && <button className='btn btn-danger _btn mt-lg-3 ms-sm-2'>Requested</button>}
                                    { o.status === "accepted" && <button className='btn btn-info _btn mt-lg-3 ms-sm-2'>Accepted</button>}
                                </div>
                            </div>
                        </div>
                    </div>:<></>}
                    <div className="dropdown-menu" aria-labelledby="dropdownOrderButton">
                        <button value={o.PID} className="dropdown-item btn card-link" data-bs-toggle="modal" data-bs-target="#fullDescription" onClick={ showModal }>Full Description</button>
                            { o.status === 'accepted' || o.status === 'finished' ?
                                //<button value={o.OID} className="dropdown-item" data-bs-toggle="modal" data-bs-target="#chat" onClick={ _chat }>Chat</button>
                                <button value={o.OID} className="dropdown-item" onClick={ _chat }>Chat</button>
                                :
                                <>
                                    <button className="dropdown-item" disabled>Chat</button> 
                                    <small className="text-muted dropdown-item">(You can chat with the vender when the order is accepted)</small> 
                                </>
                            }   
                        <button value={o.OID} className="dropdown-item" onClick={ cancelOrder }>Cancel/Delete the order</button>
                        <small className="text-muted dropdown-item">(you can cancel the order only when the order status is requested or rejected)</small>
                    </div>
                </div>:<div key={index} hidden></div>
                
                ))
            } 
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
            { isShow === true && 
                <div className="chat_modal" id="chat">
                    <div className="order_center modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <section className='chat_section'>
                                    <div className="container py-0">
                                        <div className="row d-flex justify-content-center">
                                        <div className="col-12">
                                            <div className="card">
                                            <div className="card-header d-flex justify-content-between align-items-center p-3 chat_card_header">
                                                <h5 className="mb-0">Chat messages</h5> 
                                                 
                                                <div className="d-flex flex-row align-items-center">
                                                <span className="badge bg-warning me-3"></span>
                                                <i className="fas fa-minus me-3 text-muted fa-xs"></i>
                                                <i className="fas fa-comments me-3 text-muted fa-xs"></i>
                                                <i className="fas fa-times text-muted fa-xs"></i>
                                                <button className="btn btn-warning mx-0" type="button" onClick={ () => setIsShow( false ) }>
                                                    Close
                                                </button>   
                                                </div>
                                            </div>
                                            <div id="scroll" className="card-body chat_card_body overflow-scroll">
                                            
                                            {chat.length !== 0 ? <> {chat.map(( c , index ) => (
                                            <div key={index}>
                                                {
                                                c.sender == 'V' ?
                                                <span value="sender">
                                                    <div className="d-flex justify-content-between">
                                                        <p className="small mb-1 text-muted">{ vName }</p>
                                                        <p className="small mb-1">{c.date} {''} {c.time}</p>
                                                        
                                                    </div>
                                                    <div className="d-flex flex-row justify-content-start">
                                                        <img src={require('./photo/white.png')} className='chat_img' alt="avatar 1"/>
                                                        <div>
                                                            <p className="small p-2 ms-3 mb-3 rounded-3 chat_sender">{c.message}</p>
                                                        </div>
                                                    </div>
                                                </span>
                                                :
                                                <span value="receiver">
                                                    <div className="d-flex justify-content-between">
                                                    <p className="small mb-1 text-muted">{c.date} {''} {c.time}</p>
                                                    <p className="small mb-1">{ cusName }</p>
                                                    </div>
                                                    <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                                                    <div>
                                                        <p className="small p-2 me-3 mb-3 text-white rounded-3 chat_receiver">{c.message}</p>
                                                    </div>
                                                    <img src={require(`./photo/${sessionStorage.getItem("Picture")}`)} className='chat_img' alt="avatar 1"/>
                                                    </div>
                                                </span>
                                                }
                                            </div>))}</>:<div> You haven't had any coversation yet </div>}
                                            </div>
                                            <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                                                <form className="input-group mb-0" action='http://localhost:8000/sendMessage.php' method="post" encType="multipart/form-data" onSubmit={ ( event ) => sendMessage( event ) }>
                                                    <input type="text" className="form-control" id="message" name="message" placeholder="Type message" aria-label="Recipient's username" aria-describedby="button-addon2"  required/>
                                                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-warning" type="submit" id="button-addon2">
                                                        Send
                                                    </button>                                     
                                                </form>
                                            </div>
                                            </div>

                                        </div>
                                        </div>

                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>   
        
        ):<div className='container'><div className='empty order_center'>Your have no orders.</div></div>
        }
        </>
    )
}
