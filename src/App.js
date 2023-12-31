import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home?';
import Login from './pages/login/Login';
//import "./custom.scss"
import "./index.css"
import { Routes, Route, Link } from 'react-router-dom';
import UserContext from './components/userContext/userContext';
import { createContext, useState } from 'react';
import PatientCard from './components/patientCard/PatientCard';
import NewClientForm from './components/forms/NewClientForm';
import Client from './pages/client/Client';
import NewEncouter from './pages/new-encounter/NewEncounter';


function App() {
  const [user, setUser] = useState({
    username: null,
    token: null,
    isLoggedIn: false
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login hasAccount={true} />} />
          <Route path="/register" element={<Login hasAccount={false} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/client" element={<Client />} />
          <Route path="/new-encounter" element={<NewEncouter />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
