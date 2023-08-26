import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";
import { LoginContext } from "../App";


export default function Customer(){
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const {id} = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState(false);
    const [changed, setChanged] = useState(false);
    const [error, setError] = useState();
    const location = useLocation();
    


    useEffect(() => {
        if(!customer) return;
        if(!tempCustomer) return;
        let equal = true;
        if (customer.name !== tempCustomer.name){
            equal = false;
        }
        if (customer.industry !== tempCustomer.industry){
            equal = false;
        }
        if(equal){
            setChanged(false);
        }
    });

    useEffect(() => {
        const url = baseUrl + 'api/customers/' + id;
        fetch(url, {
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
        })
        .then((response) => {
            if(response.status === 404){
                //redirect to 404 page (new URL)
                //navigate('/404')
                
                //render a 404 component in this page
                setNotFound(true)
                return null;
            } else if (response.status === 401){
                setLoggedIn(false);
                navigate('/login', {
                    state: {
                        previousUrl : location.pathname,
                    },
                });
            }

            if (!response.ok) throw new Error('somethinng went wrong, try again later');

            return response.json();
        })
        .then((data) => {
            if(data != null){
                setCustomer(data.customer);
                setTempCustomer(data.customer);
            }else{
                setCustomer(null);
                setTempCustomer(null);
            }
        }).catch((e) => {
            setError(undefined);
        })
    }, []);

    function updateCustomer(e){
        e.preventDefault();
        const url = baseUrl + 'api/customers/' + id;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
            body: JSON.stringify(tempCustomer)
        }).then((response) => {
            if (response.status === 401){
                setLoggedIn(false);
                navigate('/login', {
                    state: {
                        previousUrl : location.pathname,
                    },
                });
            }
            if (!response.ok) throw new Error('somethinng went wrong');
            return response.json();
        }).then((data)=>{
            setChanged(false);
            setCustomer(data.customer);
            setError(undefined);
        }).catch((e) => {
            setError(e.message)
        });
    }

    return (
        <div className='p-3'>
           {notFound ? <NotFound /> : null}
           {customer ? 
           <div >
                {/* <p className="m-2 block px-2">ID: {tempCustomer.id}</p> */}
                <form id="customer" className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                <label  for="name">Name</label> 
                </div>
                <div className="md:w-3/4">     
                <input 
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="name" type="text" value={tempCustomer.name} onChange={(e) => {
                        setChanged(true);
                        setTempCustomer({...tempCustomer, name: e.target.value});
                        
                    }}/>
                    </div>
                </div> 
                <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">  
                <label for="industry">Industry</label> 
                </div> 
                <div className="md:w-3/4">  
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="industry" type="text" value={tempCustomer.industry} onChange={(e) => {
                        setChanged(true);
                        setTempCustomer({...tempCustomer, industry: e.target.value});
                       
                    }} />
                 </div>
                 </div>    
                    </form>

                    {changed ? (
                    <div className="mb-2"> 
                        <button className="bg-slate-500 hover:bg-slate-700 text-white mr-2 font-bold py-2 px-4 rounded" 
                            onClick={(e) => {
                            setTempCustomer({...customer});
                            setChanged(false);
                        }} >Cancel</button> 
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            form="customer" 
                            onClick={updateCustomer}
                        >Save</button> 
                    </div>): null}
            <div>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                const url = baseUrl + 'api/customers/' + id;
                fetch(url, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + localStorage.getItem('access'),
                            }, 
                            
                        }).then((response) => {
                            setLoggedIn(false);
                            if (response.status === 401){
                                navigate('/login', {
                                    state: {
                                        previousUrl : location.pathname,
                                    },
                                });
                            }
                            if(!response.ok){
                                throw new Error('Something went wrong')
                            }
                            navigate('/customers');
                            //assume things went well
                }).catch((e) => {
                    console.log(e);
                });  
            }}>Delete</button>
            </div>
            {error? <p>{error}</p>: null}
            </div> : null} 
            {error? <p>{error}</p>: null}
            <br />
            <Link className="no-underline bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to="/customers"> Go Back</Link>
        </div>
    );
}