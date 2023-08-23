import { useEffect, useState } from "react"
import { Link, json } from "react-router-dom";
import AddCustomer from "../components/AddCustomer";
import { baseUrl } from "../shared";

export default function Customers(){
    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);

    function toggleShow(){
        setShow(!show);
    }

    useEffect(() => {
        console.log('fetching')
        fetch('http://127.0.0.1:8000/api/customers/')
        .then((response) => response.json())
        .then((data) => {
            setCustomers(data.customers)
        });
    }, []);

    function newCustomer(name , industry){
        const data = {name: name, industry: industry};
        const url = baseUrl + 'api/customers/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
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