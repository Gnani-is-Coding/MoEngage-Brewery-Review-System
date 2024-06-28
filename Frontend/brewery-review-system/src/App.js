import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import BreweryDetails from './Components/BreweryDetails/BreweryDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/brewery-details/:id" element={<BreweryDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
