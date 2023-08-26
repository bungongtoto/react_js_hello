import { useContext, useEffect, useState } from "react"
import { Link, json, useLocation, useNavigate } from "react-router-dom";
import AddCustomer from "../components/AddCustomer";
import { baseUrl } from "../shared";
import { LoginContext } from "../App";

export default function Customers(){
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    function toggleShow(){
        setShow(!show);
    }

    useEffect(() => {
        const url = baseUrl + 'api/customers/';
        fetch(url, {
            headers: {
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
        })
        .then((response) => {
            if(response.status === 401){
                setLoggedIn(false);
                navigate('/login', {
                    state: {
                        previousUrl : location.pathname,
                    },
                });
            }
            return response.json()
        })
        .then((data) => {
             data ? setCustomers(data.customers) : setCustomers(null);
        });
    }, []);

    function newCustomer(name , industry){
        const data = {name: name, industry: industry};
        const url = baseUrl + 'api/customers/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if(response.status === 401){
                navigate('/login', {
                    state: {
                        previousUrl : location.pathname,
                    },
                });
            }
            if(!response.ok){
                throw new Error('Something went wrong')
            }
            return response.json();
        }).then((data) => {
            toggleShow();
            //make sure the list is updated appropriately
            setCustomers([...customers, data.customer]);
        }).catch((e) => {
            console.log(e)
        });
    }

    return (
        <>
            <h1>Here our customers:</h1>
            {
                customers ? customers.map((customer) => {
                    return (
                        <div className="m-2" key={customer.id}>
                         <Link to={"/customers/" + customer.id}>
                            <button className="no-underline bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {customer.name}
                            </button>
                         </Link>
                        </div>
                    );
                })
                : null
            }
            
            <AddCustomer show={show} newCustomer={newCustomer}toggleShow={toggleShow} />
        </>
    );
}