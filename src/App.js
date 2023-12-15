import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home?';
import Login from './pages/login/Login';
import "./custom.scss"
import "./index.css"
import { Routes, Route, Link } from 'react-router-dom';
import UserContext from './components/userContext/userContext';
import { useState } from 'react';
import Patient from './pages/patient/Patient';
import NewEncounter from './pages/new-encounter/NewEncounter';
import UserProfile from './pages/UserProfile/UserProfile';



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
          <Route path="/dashboard/home" element={<Dashboard page="home" />} />
          <Route path="/dashboard/patients" element={<Dashboard page='patient' />} />
          <Route path="/dashboard/forms" element={<Dashboard page='forms' />} />
          <Route path="/dashboard/admin" element={<Dashboard page='admin' />} />
          <Route path="/dashboard/reports" element={<Dashboard page='reports' />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/new-encounter/one-to-one" element={<NewEncounter form="ind" />} />
          <Route path="/new-encounter/bp-screen" element={<NewEncounter form="bp" />} />
          <Route path="/new-encounter/foot-screen" element={<NewEncounter form="foot" />} />

        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
