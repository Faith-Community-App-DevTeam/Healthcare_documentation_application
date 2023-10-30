import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home?';
import Login from './pages/login/Login';
//import "./custom.scss"
import "./index.css"
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login hasAccount={true} />} />
        <Route path="register" element={<Login hasAccount={false} />} />
        <Route path="home" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
