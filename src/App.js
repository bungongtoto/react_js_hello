import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';

function App() {
  const [role , setRole] = useState("dev");
  const showEmployees = true;
  return (
    <div className="App bg-red-300">
      {showEmployees ? (
      <>
        <input type='text' onChange={(e) => {
          setRole(e.target.value);
        }} />
        <Employee name="Kingsley" role="intern" />  
        <Employee name="Bungong" role={role} />
        <Employee name="Peter" />
      </>
     )  : (
        <p>You can no see the employees</p>
     )}
    </div>
  );
}

export default App;
