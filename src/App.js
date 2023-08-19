import Header from './components/Header';
import NotFound from './components/NotFound';
import './index.css';
import Customers from './pages/Customers';
import Defination from './pages/Defination';
import Dictionary from './pages/Dictionary';
import Employees from './pages/Employees';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/employees' element={<Employees />} />
          <Route path='/dictionary' element={<Dictionary />} />
          <Route 
            path='/defination/:search' 
            element={<Defination />} 
          />
          <Route path='/customers' element={<Customers />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
