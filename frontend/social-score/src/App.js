import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, Navigate } from 'react-router-dom';
import ProtectedRoutes from './navigation/ProtectedRoutes';
import UserDashboard from './pages/UserDashboard';
import DangerMap from './pages/DangerMap';

function App() {
  const userList = ['ROLE_USER', 'ROLE_ADMIN'];
  const [user, setUser] = useState('ROLE_USER');
  
  const hiddenNavbarRoutes = []

  function getScreen (user, userScreen, adminScreen){
    switch(user) {
      case "ROLE_USER":
        return userScreen;
      case "ROLE_ADMIN":
          return adminScreen;
      default:
          return <Navigate to="/join_us" replace/>;
    }
  }
  
  function getLoggedOutScreen (user, screen){
    switch(user) {
      case "ROLE_USER":
      case "ROLE_ADMIN":
        return <Navigate to="/" replace/>;
      default:
          return screen;
    }
  }

  function getSingleScreen (chosenUser, user, screen) {
    if (chosenUser === user)
      return screen;
    else return <Navigate to="/" replace/>;
  }

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes user={user} isHidden={hiddenNavbarRoutes.includes(window.location.pathname)}/>}>
          {/*Logged out screens*/}
          <Route exact path="/" element={getSingleScreen("ROLE_USER", user, <UserDashboard />)} />
          <Route exact path="/danger-map" element={<DangerMap mapUrl="/map1.geo.json" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
