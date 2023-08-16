import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';
// import {v4 as uuidv4} from 'uuid'; 

function App() {
  
  const [employees, setEmployees] = useState(
    [
      {
        id: 1,
        name: 'Kingsley',
        role: 'Developer',
        img: 'https://images.pexels.com/photos/5439367/pexels-photo-5439367.jpeg',
      },
      {
        id: 2,
        name: 'Ndzi',
        role: 'CEO',
        img: 'https://images.pexels.com/photos/4183527/pexels-photo-4183527.jpeg',
      },
      {
        id: 3,
        name:'Bungong',
        role: 'President',
        img: 'https://images.pexels.com/photos/8052844/pexels-photo-8052844.jpeg',
      },
      {
        id: 4,
        name: 'Caleb',
        role: 'Developer',
        img: 'https://images.pexels.com/photos/9301401/pexels-photo-9301401.jpeg',
      },
      {
        id: 5,
        name: 'Bertrand',
        role: 'CEO',
        img: 'https://images.pexels.com/photos/5060569/pexels-photo-5060569.jpeg',
      },
      {
        id: 6,
        name: 'BKN',
        role: 'Founder',
        img: 'https://images.pexels.com/photos/4183527/pexels-photo-4183527.jpeg',
      },
    ]
  );
  
  function updateEmployee(id, newName, newRole){
    const updatedEmployees = employees.map((employee) => {
      if( id == employee.id){
        return {...employee, name:newName, role:newRole}
      }
      return employee; 
    });
    setEmployees(updatedEmployees);
  }

  const showEmployees = true;
  return (
    <div className="App">
      {showEmployees ? (
      <>
        <div className='flex flex-wrap justify-center' >
          
          {employees.map((employee) => {
            return(
            <Employee 
              key={employee.id}
              id={employee.id} 
              name={employee.name} 
              role={employee.role} 
              img={employee.img} 
              updateEmployee={updateEmployee} 
            />
            );
          })}
        </div>
      </>
     )  : (
        <p>You can no see the employees</p>
     )}
    </div>
  );
}

export default App;
