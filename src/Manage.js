import React , { useState , useEffect } from 'react';
import $ from 'jquery';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { confirmAlert } from 'react-confirm-alert'; // Import
import './Home.css'; 
import { type } from '@testing-library/user-event/dist/type';

export default function Home ()
{ 
    const [ accounts , setAccounts ] = useState([]);
    const [ account , setAccount ] = useState([]); 
    const [ carts , setCarts ] = useState([]);
    const [ cart , setCart ] = useState([]); 
    const [ chats , setChats ] = useState([]);
    const [ chat , setChat ] = useState([]); 
    const [ orders , setOrders ] = useState([]);
    const [ order , setOrder ] = useState([]); 
    const [ products , setProducts ] = useState([]);
    const [ product , setProduct ] = useState([]); 
    const [ edit , setEdit ] = useState(false); 
    const [ editID , setEditID ] = useState(0); 

    
    const fetchData = async () => {
        try {
        const response = await fetch('http://localhost:8000/admin_queryAccount.php');
        const data = await response.json();
        // console.log( data ) ;
        setAccounts( data );
        } catch (error) {
        console.error('Error fetching data:', error);
        }
        try {
        const response = await fetch('http://localhost:8000/admin_queryCart.php');
        const data = await response.json();
        // console.log( data ) ;
        setCarts( data );
        } catch (error) {
        console.error('Error fetching data:', error);
        }
        try {
        const response = await fetch('http://localhost:8000/admin_queryChat.php');
        const data = await response.json();
        // console.log( data ) ;
        setChats( data );
        } catch (error) {
        console.error('Error fetching data:', error);
        }
        try {
        const response = await fetch('http://localhost:8000/admin_queryOrders.php');
        const data = await response.json();
        // console.log( data ) ;
        setOrders( data );
        } catch (error) {
        console.error('Error fetching data:', error);
        }
        try {
        const response = await fetch('http://localhost:8000/admin_queryProduct.php');
        const data = await response.json();
        // console.log( data ) ;
        setProducts( data );
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };
    useEffect(( ) => {
        fetchData();
    }, []);

    function editOrCancel( id )
    {
        if( edit === false )
        {
            setEditID( Number( id ) ); 
            setEdit( true ); 
            // console.log( id );
        }else{
            setEdit( false ); 
            setEditID( 0 ); 
        }
    }
    function deleteOrSubmit( id )
    {
        if( edit === true )
        {
            if( sessionStorage.getItem("tableName") === 'product' )
            {
                const PID = $("#PID").val(); 
                const name = $("#name").val(); 
                const AID = $("#AID").val(); 
                const image = $("#image").val(); 
                const condition = $("#condition").val(); 
                const price = $("#price").val(); 
                const year = $("#year").val(); 
                const amount = $("#amount").val(); 
                const description = $("#description").val(); 
                const formData = new FormData();
                formData.append('PID' , PID );
                formData.append('name' , name );
                formData.append('AID' , AID );
                formData.append('image' , image );
                formData.append('condition' , condition );
                formData.append('price' , price );
                formData.append('year' , year );
                formData.append('amount' , amount );
                formData.append('description' , description );
                formData.append('ID' , id ); 
                // console.log( formData ); 
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8000/admin_editProduct.php',
                    data: formData,
                    processData: false,  // Prevent jQuery from automatically processing the data
                    contentType: false,  // Prevent jQuery from automatically setting contentType
                    success: function(res) {
                        const r = JSON.parse( res );  
                        if (r.result=== 0) {
                            alert(JSON.stringify( r.msg )); 
                        } else if (r.result === 1) {
                            // alert('Edit successfully!');
                            // console.log( typeof(r.result) ); 
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error(xhr.responseText); // Log any errors
                    }
                });                
            }else if( sessionStorage.getItem("tableName") === 'orders' ){		
                const OID = $("#OID").val(); 
                const VenderID = $("#VenderID").val(); 
                const CustomerID = $("#CustomerID").val(); 
                const PID = $("#PID").val(); 
                const amount = $("#amount").val(); 
                const price = $("#price").val(); 
                const date = $("#date").val(); 
                const status = $("#status").val(); 
                const formData = new FormData();
                formData.append('OID' , OID );
                formData.append('VenderID' , VenderID );
                formData.append('CustomerID' , CustomerID );
                formData.append('PID' , PID );
                formData.append('amount' , amount );
                formData.append('price' , price );
                formData.append('date' , date );
                formData.append('status' , status );
                formData.append('ID' , id ); 
                // console.log( formData ); 
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8000/admin_editOrders.php',
                    data: formData,
                    processData: false, 
                    contentType: false, 
                    success: function(res) {
                        const r = JSON.parse( res );  
                        if (r.result=== 0) {
                            alert(JSON.stringify( r.msg )); 
                        } else if (r.result === 1) {
                            // alert('Edit successfully!');
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error(xhr.responseText); // Log any errors
                    }
                });       
            }else if( sessionStorage.getItem("tableName") === 'chat' ){	
                const CID = $("#CID").val(); 
                const VenderID = $("#VenderID").val(); 
                const CustomerID = $("#CustomerID").val(); 
                const sender = $("#sender").val(); 
                const message = $("#message").val(); 
                const date = $("#date").val(); 
                const time = $("#time").val(); 
                const formData = new FormData();
                formData.append('CID' , CID );
                formData.append('VenderID' , VenderID );
                formData.append('CustomerID' , CustomerID );
                formData.append('sender' , sender );
                formData.append('message' , message );
                formData.append('date' , date );
                formData.append('time' , time );
                formData.append('ID' , id ); 
                // console.log( formData ); 
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8000/admin_editChat.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(res) {
                        const r = JSON.parse( res );  
                        if (r.result=== 0) {
                            alert(JSON.stringify( r.msg )); 
                        } else if (r.result === 1) {
                            // alert('Edit successfully!');
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error(xhr.responseText); // Log any errors
                    }
                });       
            }else if( sessionStorage.getItem("tableName") === 'cart' ){	
                const CID = $("#CID").val(); 
                const AID = $("#AID").val(); 
                const PID = $("#PID").val(); 
                const amount = $("#amount").val(); 
                const price = $("#price").val(); 

                const formData = new FormData();

                formData.append('CID' , CID );
                formData.append('AID' , AID );
                formData.append('PID' , PID );
                formData.append('amount' , amount );
                formData.append('price' , price );

                formData.append('ID' , id ); 
                // console.log( formData ); 
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8000/admin_editCart.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(res) {
                        // console.log(typeof(res));
                        const r = JSON.parse( res );  
                        if (r.result=== 0) {
                            alert(JSON.stringify( r.msg )); 
                        } else if (r.result === 1) {
                            // alert('Edit successfully!');
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error(xhr.responseText); // Log any errors
                    }
                });       
            }else if( sessionStorage.getItem("tableName") === 'account' ){	
                const AID = $("#AID").val(); 
                const name = $("#name").val(); 
                const account = $("#account").val(); 
                const hash = $("#hash").val(); 
                const picture = $("#picture").val(); 

                const formData = new FormData();

                formData.append('AID' , AID );
                formData.append('name' , name );
                formData.append('account' , account );
                formData.append('hash' , hash );
                formData.append('picture' , picture );

                formData.append('ID' , id ); 
                // console.log( formData ); 
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8000/admin_editAccount.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(res) {
                        // console.log(typeof(res));
                        const r = JSON.parse( res );  
                        if (r.result=== 0) {
                            alert(JSON.stringify( r.msg )); 
                        } else if (r.result === 1) {
                            // alert('Edit successfully!');
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error(xhr.responseText); // Log any errors
                    }
                });       
            }
            setEdit( false ); 
            fetchData(); 
        }else{
            deleteData( Number(id) ); 
        }
    }

    function delete_Data( id )
    {
        if( sessionStorage.getItem("tableName") === 'product' )
        {
            $.ajax({
                type:'GET',
                url: 'http://localhost:8000/deleteProduct.php',
                data: { pid :id } , 
                dataType: 'json',
                success( res ){ 
                    console.log( res );
                }
            });             
        }else if( sessionStorage.getItem("tableName") === 'orders' ){
            $.ajax({
                type:'GET',
                url: 'http://localhost:8000/admin_deleteOrder.php',
                data: { oid :id } , 
                dataType: 'json',
                success( res ){ 
                    console.log( res );
                }
            });    
        }else if( sessionStorage.getItem("tableName") === 'chat' ){
            $.ajax({
                type:'GET',
                url: 'http://localhost:8000/admin_deletechat.php',
                data: { cid :id } , 
                dataType: 'json',
                success( res ){ 
                    console.log( res );
                }
            });    
        }else if( sessionStorage.getItem("tableName") === 'cart' ){
            $.ajax({
                type:'GET',
                url: 'http://localhost:8000/admin_deleteCart.php',
                data: { cid :id } , 
                dataType: 'json',
                success( res ){ 
                    console.log( res );
                }
            });    
        }else if( sessionStorage.getItem("tableName") === 'account' ){
            $.ajax({
                type:'GET',
                url: 'http://localhost:8000/admin_deleteAccount.php',
                data: { aid :id } , 
                dataType: 'json',
                success( res ){ 
                    console.log( res );
                }
            });    
        }

        fetchData();  
    } 

    function deleteData( id )
    {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this record? id = ' + id ,
            buttons: [
                {
                label: 'Yes',
                onClick: () => delete_Data( id )
                },
                {
                label: 'No',
                //onClick: () => alert('Click No')
                }
            ]
            });
    }
    

    // console.log(sessionStorage.getItem("tableName")); 
    // console.log(sessionStorage.getItem("search")); 
    // console.log(editID); 
    return(//container ->> in center; row ->> next row 
    <>
        <div className='container mt-4'><h2>{sessionStorage.getItem("tableName")}</h2><hr/></div>
        <div className='container container_size mt-4'>
                <div className='row'>
                {
                    sessionStorage.getItem("tableName") === 'account' && accounts.length !== 0 ?     
                    <table className="table table-striped">              
                    <thead>
                        <tr>
                        {
                            Object.keys(accounts[0]).map((key, index) => (
                                <th scope="col" key={index}>{key}</th>
                            ))
                        }
                        <th scope='col'>action</th>
                        <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        accounts.map(( a , index ) => (
                            a.name.includes( sessionStorage.getItem("search") ) ?
                            <tr key={index}>
                            {
                                Object.keys(a).map((k, index) => (
                                    edit && editID === a.AID ?
                                    <th cope="col" key={index}>
                                        <form id = "edit">
                                            <input type="text" defaultValue={a[k]} className="form-control" placeholder={k} id={k} name={k} aria-label="Name" aria-describedby="basic-addon1" pattern='[0-9a-zA-Z]+' maxLength={50} required/>
                                        </form>
                                    </th>
                                    :
                                    <th scope="col" key={index}>{a[k]}</th>
                                ))
                            }
                            { //( edit === true && editID === p.PID ) || edit === false  ?
                                <>
                                    <td><button value={a.AID} className='btn btn-info' onClick={( event ) => editOrCancel( event.target.value )} hidden={ edit === true && editID !== a.AID}>{edit ? "Cancel" : "Edit"}</button></td>
                                    <td><button value={a.AID} className='btn btn-success' onClick={( event ) => deleteOrSubmit( event.target.value)} hidden={ edit === true && editID !== a.AID}>{edit ? "Submit" : "Delete"}</button></td> 
                                </>
                                // :
                                // <></>
                            }
                            </tr>
                            :
                            <></>                            
                        ))
                    }
                    </tbody>
                    </table>:<div className='col-xl-3 col-lg-4 col-md-6 col-12' hidden></div>
                }
                {
                    sessionStorage.getItem("tableName") === 'cart' && carts.length !== 0 ?     
                    <table className="table table-striped">              
                    <thead>
                        <tr>
                        {
                            Object.keys(carts[0]).map((key, index) => (
                                <th scope="col" key={index}>{key}</th>
                            ))
                            
                        }
                        <th scope='col'>action</th>
                        <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        carts.map(( c , index ) => (
                            // c.message.includes( sessionStorage.getItem("search") ) ?
                            <tr key={index}>
                            {
                                Object.keys(c).map((k, index) => (
                                    edit && editID === c.CID ?
                                    <th cope="col" key={index}>
                                        <form id = "edit">
                                            <input type="text" defaultValue={c[k]} className="form-control" placeholder={k} id={k} name={k} aria-label="Name" aria-describedby="basic-addon1" pattern='[0-9a-zA-Z]+' maxLength={50} required/>
                                        </form>
                                    </th>
                                    :
                                    <th scope="col" key={index}>{c[k]}</th>
                                ))
                            }
                            { //( edit === true && editID === p.PID ) || edit === false  ?
                                <>
                                    <td><button value={c.CID} className='btn btn-info' onClick={( event ) => editOrCancel( event.target.value )} hidden={ edit === true && editID !== c.CID}>{edit ? "Cancel" : "Edit"}</button></td>
                                    <td><button value={c.CID} className='btn btn-success' onClick={( event ) => deleteOrSubmit( event.target.value)} hidden={ edit === true && editID !== c.CID}>{edit ? "Submit" : "Delete"}</button></td> 
                                </>
                                // :
                                // <></>
                            }
                            </tr>
                            // :
                            // <></>                            
                        ))
                    }
                    </tbody>
                    </table>:<div className='col-xl-3 col-lg-4 col-md-6 col-12' hidden></div>
                }  
                {
                    sessionStorage.getItem("tableName") === 'chat' && chats.length !== 0 ?     
                    <table className="table table-striped">              
                    <thead>
                        <tr>
                        {
                            Object.keys(chats[0]).map((key, index) => (
                                <th scope="col" key={index}>{key}</th>
                            ))
                        }
                        <th scope='col'>action</th>
                        <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        chats.map(( c , index ) => (
                            c.message.includes( sessionStorage.getItem("search") ) ?
                            <tr key={index}>
                            {
                                Object.keys(c).map((k, index) => (
                                    edit && editID === c.CID ?
                                    <th cope="col" key={index}>
                                        <form id = "edit">
                                            <input type="text" defaultValue={c[k]} className="form-control" placeholder={k} id={k} name={k} aria-label="Name" aria-describedby="basic-addon1" pattern='[0-9a-zA-Z]+' maxLength={50} required/>
                                        </form>
                                    </th>
                                    :
                                    <th scope="col" key={index}>{c[k]}</th>
                                ))
                            }
                            { //( edit === true && editID === p.PID ) || edit === false  ?
                                <>
                                    <td><button value={c.CID} className='btn btn-info' onClick={( event ) => editOrCancel( event.target.value )} hidden={ edit === true && editID !== c.CID}>{edit ? "Cancel" : "Edit"}</button></td>
                                    <td><button value={c.CID} className='btn btn-success' onClick={( event ) => deleteOrSubmit( event.target.value)} hidden={ edit === true && editID !== c.CID}>{edit ? "Submit" : "Delete"}</button></td> 
                                </>
                                // :
                                // <></>
                            }
                            </tr>
                            :
                            <></>                            
                        ))
                    }
                    </tbody>
                    </table>:<div className='col-xl-3 col-lg-4 col-md-6 col-12' hidden></div>
                }  
                {
                    sessionStorage.getItem("tableName") === 'orders' && orders.length !== 0 ?     
                    <table className="table table-striped">              
                    <thead>
                        <tr>
                        {
                            Object.keys(orders[0]).map((key, index) => (
                                <th scope="col" key={index}>{key}</th>
                            ))
                        }
                        <th scope='col'>action</th>
                        <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map(( o , index ) => (
                            // o.name.includes( sessionStorage.getItem("search") ) ?
                            <tr key={index}>
                            {
                                Object.keys(o).map((k, index) => (
                                    edit && editID === o.OID ?
                                    <th cope="col" key={index}>
                                        <form id = "edit">
                                            <input type="text" defaultValue={o[k]} className="form-control" placeholder={k} id={k} name={k} aria-label="Name" aria-describedby="basic-addon1" pattern='[0-9a-zA-Z]+' maxLength={50} required/>
                                        </form>
                                    </th>
                                    :
                                    <th scope="col" key={index}>{o[k]}</th>
                                ))
                            }
                            { //( edit === true && editID === p.PID ) || edit === false  ?
                                <>
                                    <td><button value={o.OID} className='btn btn-info' onClick={( event ) => editOrCancel( event.target.value )} hidden={ edit === true && editID !== o.OID}>{edit ? "Cancel" : "Edit"}</button></td>
                                    <td><button value={o.OID} className='btn btn-success' onClick={( event ) => deleteOrSubmit( event.target.value)} hidden={ edit === true && editID !== o.OID}>{edit ? "Submit" : "Delete"}</button></td> 
                                </>
                                // :
                                // <></>
                            }
                            </tr>
                            // :
                            // <></>                            
                        ))
                    }
                    </tbody>
                    </table>:<div className='col-xl-3 col-lg-4 col-md-6 col-12' hidden></div>
                }  
                {
                    sessionStorage.getItem("tableName") === 'product' && products.length !== 0 ?     
                    <table className="table table-striped">              
                    <thead>
                        <tr>
                        {
                            Object.keys(products[0]).map((key, index) => (
                                <th scope="col" key={index}>{key}</th>
                            ))
                        }
                        <th scope='col'>action</th>
                        {/* <th scope='col'></th> */}
                        </tr>
                    </thead>
                    <tbody>
                    {
                        products.map(( p , index ) => (
                            p.name.includes( sessionStorage.getItem("search") ) ?
                            <tr key={index}>
                            {
                                Object.keys(p).map((k, index) => (
                                    edit && editID === p.PID ?
                                    <th cope="col" key={index}>
                                        <form id = "edit">
                                            <input type="text" defaultValue={p[k]} className="form-control" placeholder={k} id={k} name={k} aria-label="Name" aria-describedby="basic-addon1" pattern='[0-9a-zA-Z]+' maxLength={50} required/>
                                        </form>
                                    </th>
                                    :
                                    <th scope="col" key={index}>{p[k]}</th>
                                ))
                            }
                            { //( edit === true && editID === p.PID ) || edit === false  ?
                                <>
                                    <td><button value={p.PID} className='btn btn-info' onClick={( event ) => editOrCancel( event.target.value )} hidden={ edit === true && editID !== p.PID}>{edit ? "Cancel" : "Edit"}</button></td>
                                    <td><button value={p.PID} className='btn btn-success' onClick={( event ) => deleteOrSubmit( event.target.value)} hidden={ edit === true && editID !== p.PID}>{edit ? "Submit" : "Delete"}</button></td> 
                                </>
                                // :
                                // <></>
                            }
                            </tr>
                            :
                            <></>                            
                        ))
                    }
                    
                    </tbody>
                    </table>:<div className='col-xl-3 col-lg-4 col-md-6 col-12' hidden></div>
                } 
                </div>                  
        </div> 
    </>
    );
}