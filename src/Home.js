import React , { useState , useEffect } from 'react';
import $ from 'jquery';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Home ()
{ 
    const [ products , setProducts ] = useState([]);//[] is array( string ) which can use .map(); {} is for object which only has foreach method 
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
    const [ OP , setOP ] = useState(<></>);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8000/queryProduct.php');
            const data = await response.json();
            //console.log( data ) ;
            setProducts( data );
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

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
                console.log( res );
                setProduct( res ) ; //no need to JSON => parse
            }
        });
        //op(); 
    }
    function addToCart( event )
    {
        event.preventDefault();
        const form = $( event.target ) ;
        const email = sessionStorage.getItem("Email"); 
        let form_data = form.serializeArray();
        form_data.push({name: 'pid' , value: product.PID }, { name: 'email' , value: email });
        //console.log( form_data ) ;
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
                    alert("Add Sucessfully !");
                }else if( r["result"] === 0 ){
                    alert("error !"); 
                }else if( r["result"] === 2 ){
                    alert("You had added this product ! If you want to change the amount, Please go to the Cart.");
                }
            }
        });
    }
    /*
    function op()
    {
        const op = [] ;
        for( let i = 1 ; i >= product.amount ; i++ )
        {
            op.push( <option key={i}>{i}</option> );
        }
        console.log( typeof( <></> )  );
        console.log( typeof( op ) ) ; 
        setOP( <div>{ op }</div>) ;
        console.log( OP ) ;
    }*/
    return(//container ->> in center; row ->> next row 
    <div className='container container_size mt-4'>
        <div className="card-group">
            <div className='row'>
            {
                products.map(( p , index ) => (
                <div className='col-lg-3 col-12' key={ index }>
                    <div className="card mb-2">
                        <img src={require(`./photo/${p.image}`)} className="card-img-top _img m-10" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text _fix_height">{p.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Condition:{p.condition}</li>
                            <li className="list-group-item">Price:{p.price}</li>
                        </ul>
                        <div className="card-body">
                            <button value={p.PID} className="btn card-link btn-link" data-bs-toggle="modal" data-bs-target="#fullDescription" onClick={ showModal }>More details</button>
                            <button value={p.PID} className="btn card-link btn-link " data-bs-toggle="modal" data-bs-target="#addToCart" onClick={ showModal } >Add to cart</button>
                        </div>
                    </div>
                </div>
                ))
            }                      
            </div>            
                <div className="modal fade" id="addToCart" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">{product.name}</h5>
                            </div>
                            <div className="modal-body">
                                <img src = { product.image === '' ? "" : require( `./photo/${product.image}` ) } className='img-fluid' />
                                <div> price: { product.price } {' '} NT$ </div>
                                <div> remaining: { product.amount } </div>
                                
                                <form action='http://localhost:8000/addToCart.php' method='get' onSubmit={ ( event ) => addToCart( event ) }>
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
                                        {/*product.amount !== 0 ? () => {
                                            function A(){
                                                const arr = Array.from({ length: product.amount }, (_, index) => index + 1);
                                                console.log("XX");
                                                return(
                                                <>  {
                                                        arr.map(i => (
                                                            <option key={i}>{i}</option>
                                                    ))}
                                                </>
                                                );
                                            }
                                            return <A/>;   
                                            }:<></>
                                        */}
                                    </select>
                                    <div className="modal-footer">                                                         
                                        <button value={product.PID} type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                                <img src = { product.image === '' ? "" : require( `./photo/${product.image}` ) } className='img-fluid' />
                                <div> Remaining: { product.amount } </div>
                                <div> Condition: { product.condition } </div>
                                <div> Price: { product.price } </div>
                                <div> Year: { product.year } </div>
                                <div> Description: { product.description } </div>
                                <form action='http://localhost:8000/addToCart.php' method='get' onSubmit={ ( event ) => addToCart( event ) }>
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

    );
}