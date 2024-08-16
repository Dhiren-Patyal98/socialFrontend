import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/HomePage/NavBar';
import Login from './components/LoginLogout/Login';
import Register from './components/LoginLogout/Register';
import Profile from './components/Profile/Profile';
import Logout from './components/LoginLogout/Logout';


function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  
  const showNavBar = !['/', '/register'].includes(location.pathname);

  return (
    <div>
      {showNavBar && <NavBar />}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
