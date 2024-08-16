import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/HomePage/NavBar';
import Login from './components/LoginLogout/Login';
import Register from './components/LoginLogout/Register';

import Logout from './components/LoginLogout/Logout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/navbar" element={
          <ProtectedRoute element={
            <div>
              <NavBar />
            
            </div>
          } />
        } />
      </Routes>
    </div>
  );
}

export default App;
