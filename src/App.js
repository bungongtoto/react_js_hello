import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid'; 

function App() {
  const [role , setRole] = useState("dev");
  
  const [employees, setEmployees] = useState(
    [
      {
        name: 'Kingsley',
        role: 'Developer',
        img: 'https://images.pexels.com/photos/5439367/pexels-photo-5439367.jpeg',
      },
      {
        name: 'Ndzi',
        role: 'CEO',
        img: 'https://images.pexels.com/photos/4183527/pexels-photo-4183527.jpeg',
      },
      {
        name: 'Bungong',
        role: 'President',
        img: 'https://images.pexels.com/photos/8052844/pexels-photo-8052844.jpeg',
      },
      {
        name: 'Caleb',
        role: 'Developer',
        img: 'https://images.pexels.com/photos/9301401/pexels-photo-9301401.jpeg',
      },
      {
        id: 'hfjkshkjvskn',
        name: 'Bertrand',
        role: 'CEO',
        img: 'https://images.pexels.com/photos/5060569/pexels-photo-5060569.jpeg',
      },
      {
        
        name: 'BKN',
        role: 'Founder',
        img: 'https://images.pexels.com/photos/4183527/pexels-photo-4183527.jpeg',
      },
    ]
  );
  const showEmployees = true;
  return (
    <div className="App">
      {showEmployees ? (
      <>
        <input type='text' onChange={(e) => {
          setRole(e.target.value);
        }} />
        <div className='flex flex-wrap justify-center' >
          
          {employees.map((employee) => {
            return(
            <Employee key={uuidv4()} name={employee.name} role={employee.role} img={employee.img} />
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
