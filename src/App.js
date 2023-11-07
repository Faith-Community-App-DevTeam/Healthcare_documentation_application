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


function App() {
  const [user, setUser] = useState({
    username: null,
    password: null,
    is_authenticate: false,
    church_id: "none",
    network_id: "none"

  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login hasAccount={true} />} />
          <Route path="/register" element={<Login hasAccount={false} />} />
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/test" element={<NewClientForm />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
