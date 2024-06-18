import React , { useState , useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import $ from 'jquery';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import './MyShop.css'; 

export default function MyShop ()
{ 
    const [ products , setProducts ] = useState([]);//[] is array( string ) which can use .map(); {} is for object which only has foreach method 
    const [ AID , setAID ] = useState(0);
    const [fileBlob, setFileBlob] = useState(null);
    const [ isShow , setIsShow ] = useState(false); 
    const [ chat , setChat] = useState([]); 
    const [ cusName , setCusName ] = useState("cn");
    const [ cusPicture , setCusPicture ] = useState("cp");
    const [ vName , setVName ] = useState("vn");
    const [ vPicture , setVPicture ] = useState("vp");
    const [ edit , setEdit ] = useState(false); 
    const [ product , setProduct ] = useState({
        AID: 0,
        PID: 0 ,
        amount: 0,
        condition: "0",
        description: "",
        image: "",
        name: "",
        price: 0,
        year: 0});//don't use {} !!! 
    //const [ OP , setOP ] = useState(<></>);
    const [ orders , setOrders ] = useState([]);//[] is array( string ) which can use .map(); {} is for object which only has foreach method 
    //query the order data 
    function catchOrder()
    { 
        customerNumber = 0 ; 
        customerID = 0 ;
        $.ajax({
            type:'GET',
            url: 'http://localhost:8000/queryShopOrders.php',
            data: {'email': sessionStorage.getItem("Email") }, 
            dataType: 'json', 
            success( res ){
                //console.log( res );
                const arr = Object.values( res );// Returns an array of values of the enumerable properties of an object
                setOrders( arr ) ; //no need to JSON => parse
            }
        });
    }
    // Trigger the function when the component mounts
    useEffect(() => {
        catchOrder();
    }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount
    

    function catchGood()
    {  
        const fetchData = async () => {
            $.ajax({
                type:'GET',
                url: 'http://localhost:8000/getAID.php',
                data: {email: sessionStorage.getItem("Email")}, 
                dataType: 'json',
                success( res ){
                    //const r = JSON.parse( res );
                    //console.log( res );
                    setAID( res["AID"] ) ;
                }
            });

        try {
            const response = await fetch('http://localhost:8000/queryProducts.php');
            const data = await response.json();
            //console.log( data ) ;
            setProducts( data );
            //console.log( sessionStorage.getItem("Log") ); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        fetchData();
    }

    // Trigger the function when the component mounts
    useEffect(() => {
        catchGood();
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
                //console.log( res );
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
        //console.log( id ) ;
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

    function addGoods( event )
    {
        event.preventDefault();
        const form = $(event.target);
        //console.log( fileBlob ) ;
        const formData = new FormData();
        formData.append( 'File', fileBlob );
        formData.append( 'Name', $("#Name").val());
        formData.append( 'Condition', $("#Condition").val() );
        formData.append( 'Price', $("#Price").val());
        formData.append( 'Amount', $("#Amount").val());
        formData.append( 'Year', $("#Year").val() );
        formData.append( 'Description', $("#Description").val() );
        // Append additional data to FormData object
        formData.append('AID', AID);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/addGoods.php',
            data: formData,
            processData: false,  // Prevent jQuery from automatically processing the data
            contentType: false,  // Prevent jQuery from automatically setting contentType
            success: function(res) {
                console.log(res); 
                if (res.result === 0) {
                    alert('SQL error!');
                } else if (res.result === 1) {
                    alert('Added successfully!');
                } else if (res.result === 2) {
                    alert(res.msg);
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText); // Log any errors
            }
        });
    }

    function fileInputChange( event )
    {
        const file = event.target.files[0];
        setFileBlob( file ); 
    }

    function delete_good( event )
    {
        event.preventDefault();
        const target = $( event.target );
        const _id = target.attr("value");
        console.log( _id ) ;
        $.ajax({
            type:'GET',
            url: 'http://localhost:8000/deleteProduct.php',
            data: { pid :_id } , 
            dataType: 'json',
            success( res ){ 
                console.log( res );
            }
        }); 
        catchGood();  
    } 

    function deleteGood( event )
    {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this good?',
            buttons: [
                {
                label: 'Yes',
                onClick: () => delete_good( event )
                },
                {
                label: 'No',
                //onClick: () => alert('Click No')
                }
            ]
            });
            //op(); 
    }
    
    function reject_order( event )
    {
        event.preventDefault();
        const target = $( event.target );
        const _id = target.attr("value");
        //console.log( _id ) ;
        $.ajax({
            type:'GET',
            url: 'http://localhost:8000/rejectOrder.php',
            data: { oid :_id } , 
            dataType: 'json',
            success( res ){ 
                console.log( res );
                //const r = JSON.parse( res );
                if( res["result"] === 0 )
                {
                    alert("You can only rejected the requested order !"); 
                }
            }
        }); 
        catchOrder();  
    } 
    
    function rejectOrder( event )
    {
        confirmAlert({
            title: 'Confirm to reject this Order',
            message: 'Are you sure to reject this order ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => reject_order( event )
              },
              {
                label: 'No',
                //onClick: () => alert('Click No')
              }
            ]
          });
            //op(); 
    }

    
    function accept_order( event )
    {
        event.preventDefault();
        const target = $( event.target );
        const _id = target.attr("value");
        //console.log( _id ) ;
        $.ajax({
            type:'GET',
            url: 'http://localhost:8000/acceptOrder.php',
            data: { oid :_id } , 
            dataType: 'json',
            success( res ){ 
                //console.log( res );
                //const r = JSON.parse( res );
                if( res["result"] === 0 )
                {
                    alert("You can only accept requested order !"); 
                }
            }
        }); 
        catchOrder();  
    } 
    
    function acceptOrder( event )
    {
        confirmAlert({
            title: 'Confirm to accept this Order',
            message: 'Are you sure to accept this order ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => accept_order( event )
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
        setTimeout(() => {
            //console.log( chat["result"] ); 
        }, 3000); 
        // const scroll = $("#scroll"); 
        // const element = document.getElementById('scroll');
        // scroll.scrollTop(element.outerHeight); 
        // console.log(element.scrollHeight); 
    }

    function sendMessage( event )
    {
        event.preventDefault();
        const form = $( event.target ) ;
        let form_data = form.serializeArray();
        form_data.push({ name: 'cname' , value: cusName } , { name: 'vname' , value: vName }, { name: 'sender' , value: 'V' });
        //console.log( form_data ) ;
        //console.log( id ) ;
        // $("message").val(''); 
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

    function updateGood( event )
    {
        setEdit( false ); 
        event.preventDefault();
        const form = $(event.target);
        //console.log( fileBlob ) ;
        const formData = new FormData();
        formData.append( 'File', fileBlob );
        formData.append( 'Name', $("#edit_Name").val());
        formData.append( 'Condition', $("#edit_Condition").val() );
        formData.append( 'Price', $("#edit_Price").val());
        formData.append( 'Amount', $("#edit_Amount").val());
        formData.append( 'Year', $("#edit_Year").val() );
        formData.append( 'Description', $("#edit_Description").val() );
        // Append additional data to FormData object
        formData.append('PID', $("#editGood").val());
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8000/updateGood.php',
            data: formData,
            processData: false,  // Prevent jQuery from automatically processing the data
            contentType: false,  // Prevent jQuery from automatically setting contentType
            success: function(res) {
                console.log(res); 
                if (res.result === 0) {
                    alert('SQL error!');
                } else if (res.result === 1) {
                    alert('Added successfully!');
                } else if (res.result === 2) {
                    alert(res.msg);
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText); // Log any errors
            }
        });
        catchGood(); 
        $.ajax({
            type:'GET',
            url: 'http://localhost:8000/queryAProduct.php',
            data: {'id': $("#editGood").val() }, 
            dataType: 'json',
            success( res ){
                //console.log( res );
                setProduct( res ) ; //no need to JSON => parse
            }
        });
    }


    var customerNumber = 0 ; 
    var customerID = 0 ;
    
    return(//container ->> in center; row ->> next row 
    <>
        <div className='container mt-4'><h2>Received Orders</h2><hr/></div>
        {orders.length !== 0 ?
        <div className='container container_size mt-4'>
            <div className="row">
            {
                orders.map(( o , index ) => (//it's horizontal ->> col-md2 ->> height:2/12
                <div className="dropdown" key={index}>
                    { o.name.includes( sessionStorage.getItem("search") ) ? <div className="btn btn-secondary dropdown-toggle card mb-3" key={index} type="button" id="dropdownOrderButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {customerID !== o.CustomerID? <div className='container mt-4'><h5>Customer { customerNumber = customerNumber + 1 }</h5><hr/><div hidden>{ customerID = o.CustomerID }</div></div> :<></>}
                        <div className="row no-gutters">
                            <div className="col-md-2">
                                <img src={require(`./photo/${o.image}`)} className="img-fluid cart_img" alt="..."/>
                            </div>
                            <div className="col-md-4">
                                <div className="card-body">
                                    <h3 className="card-title">{o.name}</h3>
                                    <p className="card-text"></p>
                                    <button value={o.PID} className="btn card-link btn-link p-0" data-bs-toggle="modal" data-bs-target="#fullDescription">Click the order for More details</button>
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
                                    <small className="text-muted dropdown-item">(You can chat with the customer if you accept this order)</small> 
                                </>
                        }
                        <button value={o.OID} className="dropdown-item" onClick={ rejectOrder }>Reject the Order</button>
                        <button value={o.OID} className="dropdown-item" onClick={ acceptOrder }>Accept the Order</button>
                        <small className="text-muted dropdown-item"></small>
                    </div>
                </div>
                ))
            } 
            </div>
            <div className="modal fade" id="fullDescription" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                    <div className='col-6'><h5 className="modal-title" id="exampleModalLongTitle">{product.name}</h5></div>
                                    <div className='col-4'></div>
                                    <div className='col-2'><button className='btn btn-white btn-lg' onClick={() => setEdit(true)}>Edit</button></div>
                            </div>
                            {edit === false ?
                                <div className="modal-body">
                                    <img src = { product.image === '' ? "" : require( `./photo/${product.image}` ) } className='img-fluid' alt={product.description}/>
                                    <div> Remaining: { product.amount } </div>
                                    <div> Condition: { product.condition } </div>
                                    <div> Price: { product.price } </div>
                                    <div> Year: { product.year } </div>
                                    <div> Description: { product.description } </div>
                                    <form action='http://localhost:8000/addToCart.php' method='get' onSubmit={ ( event ) => ( event ) }>
                                        <div className="modal-footer">                                       
                                        </div>
                                    </form>
                                </div>      
                                :
                                <form action='http://localhost:8000/updateGood.php'  method="post" encType="multipart/form-data" onSubmit={ ( event ) => addGoods( event ) }>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" >Name</span>
                                        </div>
                                        <input type="text" className="form-control" defaultValue={product.name} placeholder="Name" id="edit_Name" name="Name" aria-label="Name" aria-describedby="basic-addon1" pattern='[0-9a-zA-Z]+' maxLength={50} required/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Upload(jpg/png)</span>
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="edit_File" name="File" onChange={fileInputChange} accept=".jpg,.png" required/>
                                            <label className="custom-file-label">Choose file</label>
                                        </div>
                                    </div>
                                    <div className="input-group flex-nowrap m-1">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" >Condition</span>
                                        </div>
                                        <select className='account_select' defaultValue={product.condition} id="edit_Condition" name="Condition">
                                            <option value="BN"> Brand New </option> 
                                            <option value="UN"> Unused </option> 
                                            <option value="AN"> Almost New </option> 
                                            <option value="U"> Used </option> 
                                            <option value="SD"> Some Damaged </option> 
                                            <option value="QD"> Quite Damaged </option>
                                            <option value="BP"> Broken Parts </option>  
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Price</span>
                                        </div>
                                        <input type="text" className="form-control" defaultValue={product.price} placeholder="Price" id="edit_Price" name="Price" aria-label="Price" aria-describedby="basic-addon1" pattern="[0-9]+" maxLength={6} required/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Year</span>
                                        </div>
                                        <input type="text" className="form-control" defaultValue={product.year} placeholder="Year" id="edit_Year" name="Year" aria-label="Year" aria-describedby="basic-addon1" pattern="[0-9]+" maxLength={4} required/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Amount</span>
                                        </div>
                                        <input type="text" className="form-control" defaultValue={product.amount} placeholder="Amount" id="edit_Amount" name="Amount" aria-label="Amount" aria-describedby="basic-addon1" pattern="[0-9]+" max={20} required/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Description</span>
                                        </div>
                                        <textarea type="text" className="form-control" defaultValue={product.description} placeholder="Description" id="edit_Description" name="Description" aria-label="Description" aria-describedby="basic-addon1" maxLength={999}pattern='[0-9a-zA-Z,.+=-/?()[]{}:;!@#$%&*~<>]+' required/>
                                    </div>
                                    <div className="modal-footer"/> 
                                    <button type="submit" className="btn btn-primary m-1" id="editGood" name="editGood" value={product.PID} onClick={updateGood}>Update</button>                                 
                                    <button type="button" className="btn btn-secondary m-1" onClick={() => setEdit(false)}>Cancel</button>
                                </form>                  
                            }

                        </div>
                    </div>
                </div>
        </div>   
        :<div className='container'><div className='container container_size mt-4'>Your have no orders.</div></div>
        }
    <div className='container mt-3'><h2>My Goods</h2><hr/></div>
    <div className='container container_size mt-4'>
        <div className='row m-2'> 
            <div className="card-group">
                <button className="btn btn-lg card-link btn-danger m-1" data-bs-toggle="modal" data-bs-target="#addGoods">Add Goods</button> 
                <div className="modal fade" id="addGoods" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Add Goods</h5>
                            </div>
                            <div className="modal-body">
                                <form action='http://localhost:8000/addGoods.php' method="post" encType="multipart/form-data" onSubmit={ ( event ) => addGoods( event ) }>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Name</span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Name" id="Name" name="Name" aria-label="Name" aria-describedby="basic-addon1" pattern='[0-9a-zA-Z]+' maxLength={50} required/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Upload(jpg/png)</span>
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="File" name="File" onChange={fileInputChange} accept=".jpg,.png" required/>
                                            <label className="custom-file-label">Choose file</label>
                                        </div>
                                    </div>
                                    <div className="input-group flex-nowrap m-1">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" >Condition</span>
                                        </div>
                                        <select className='account_select' id="Condition" name="Condition">
                                            <option value="BN"> Brand New </option> 
                                            <option value="UN"> Unused </option> 
                                            <option value="AN"> Almost New </option> 
                                            <option value="U"> Used </option> 
                                            <option value="SD"> Some Damaged </option> 
                                            <option value="QD"> Quite Damaged </option>
                                            <option value="BP"> Broken Parts </option>  
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Price</span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Price" id="Price" name="Price" aria-label="Price" aria-describedby="basic-addon1" pattern="[0-9]+" maxLength={6} required/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Year</span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Year" id="Year" name="Year" aria-label="Year" aria-describedby="basic-addon1" pattern="[0-9]+" maxLength={4} required/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Amount</span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Amount" id="Amount" name="Amount" aria-label="Amount" aria-describedby="basic-addon1" pattern="[0-9]+" max={20} required/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Description</span>
                                        </div>
                                        <textarea type="text" className="form-control" placeholder="Description" id="Description" name="Description" aria-label="Description" aria-describedby="basic-addon1" maxLength={999}pattern='[0-9a-zA-Z,.+=-/?()[]{}:;!@#$%&*~<>]+' required/>
                                    </div>
                                    <div className="modal-footer"/> 
                                    <button type="submit" className="btn btn-primary m-1">Update</button>                                 
                                    <button type="button" className="btn btn-secondary m-1" data-bs-dismiss="modal">Close</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
            {
                products.map(( p , index ) => (
                AID === p.AID && p.name.includes( sessionStorage.getItem("search") ) ?
                <div className='col-xl-3 col-lg-4 col-md-6 col-12' key={ index }>
                    <div className="card mb-2">
                        <img src={require(`./photo/${p.image}`)} className="card-img-top _img m-10" alt="..."/>
                        <div className="card-body"> 
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text _fix_height">{p.description}</p>
                        </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Condition:{" "}{p.condition}</li>
                                    <li className="list-group-item">Price:{" "}{p.price}</li>
                                </ul>
                        <div className="card-body">
                            <button value={p.PID} className="btn card-link btn-primary" data-bs-toggle="modal" data-bs-target="#fullDescription" onClick={ showModal }>More details/Edit</button>
                            <button value={p.PID} className="btn card-link btn-success" onClick={deleteGood}>Delete</button>
                        </div>         

                    </div>
                </div>:<div key={ index } hidden></div>
                
                ))
            }                      
            </div>         
                {/* <div className="modal fade" id="fullDescription" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">123 </h5>
                            </div>
                            <div className="modal-body">
                                <img src = { product.image === '' ? "" : require( `./photo/${product.image}` ) } className='img-fluid cart_img' alt={product.description} />
                                <div> Remaining: { product.amount === 0 ? "Sold Out" : product.amount } </div>
                                <div> Condition: { product.condition } </div>
                                <div> Price: { product.price } </div>
                                <div> Year: { product.year } </div>
                                <div> Description: { product.description } </div>
                                <div className="modal-footer">                                         
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>        
    </div> 
    { isShow === true && 
        <div className="chat_modal center" id="chat">
            <div className="myshop_center modal-dialog modal-lg" role="document">
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
                                        <button className="btn btn-dark float-end" type="button" onClick={ () => setIsShow( false ) }>
                                                Close
                                        </button>    
                                        </div>
                                    </div>
                                    <div id="scroll" className="card-body chat_card_body overflow-scroll">
                                    
                                    {chat.length !== 0 ? <> {chat.map(( c , index ) => (
                                    <div key={index}>
                                        {
                                        c.sender == 'C' ?
                                        <span value="sender">
                                            <div className="d-flex justify-content-between">
                                                <p className="small mb-1 text-muted">{ cusName }</p>
                                                <p className="small mb-1">{c.date} {''} {c.time}</p>
                                                
                                            </div>
                                            <div className="d-flex flex-row justify-content-start">
                                                <img src={require(`./photo/${sessionStorage.getItem("Picture")}`)} className='chat_img' alt="avatar 1"/>
                                                <div>
                                                    <p className="small p-2 ms-3 mb-3 rounded-3 chat_sender">{c.message}</p>
                                                </div>
                                            </div>
                                        </span>
                                        :
                                        <span value="receiver">
                                            <div className="d-flex justify-content-between">
                                            <p className="small mb-1 text-muted">{c.date} {''} {c.time}</p>
                                            <p className="small mb-1">{ vName }</p>
                                            </div>
                                            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                                            <div>
                                                <p className="small p-2 me-3 mb-3 text-white rounded-3 chat_receiver">{c.message}</p>
                                            </div>
                                            <img src={require('./photo/white.png')} className='chat_img' alt="avatar 1"/>
                                            </div>
                                        </span>
                                        }
                                    </div>))}</>:<div> You haven't had any coversation yet </div>}
                                    </div>
                                    <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                                        <form className="input-group mb-0" action='http://localhost:8000/sendMessage.php' method="post" encType="multipart/form-data" onSubmit={ ( event ) => sendMessage( event ) }>
                                            <input type="text" className="form-control" id="message" name="message" placeholder="Type message" aria-label="Recipient's username" aria-describedby="button-addon2"  required/>
                                            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-warning" type="submit" id="button-addon2">
                                                Button
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
    </>
    );
}
