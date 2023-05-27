import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, Navigate } from 'react-router-dom';
import ProtectedRoutes from './navigation/ProtectedRoutes';
import UserDashboard from './pages/UserDashboard';
import DangerMap from './pages/DangerMap';
import Register from './pages/Register';
import Login from './pages/Login';

const geoUrl = "https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/miasta/wroclaw-max.geojson"

function App() {
  const userList = ['ROLE_USER', 'ROLE_ADMIN'];
  const [user, setUser] = useState('');
  
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
          <Route exact path="/register" element={getLoggedOutScreen(user, <Register />)} />
          <Route exact path="/login" element={getLoggedOutScreen(user, <Login />)} />
          
          <Route exact path="/" element={getSingleScreen("ROLE_USER", user, <UserDashboard />)} />
          <Route exact path="/danger-map" element={<DangerMap mapUrl="/map1.geo.json" />} />
        </Route>
      </Routes>
    </Router>
  );
}


const isCoordinateInsideArea = (coordinate, areaEdges) => {
  const [x, y] = coordinate;

  let isInside = false;
  for (let i = 0, j = areaEdges.length - 1; i < areaEdges.length; j = i++) {
    const [edgeX1, edgeY1] = areaEdges[i];
    const [edgeX2, edgeY2] = areaEdges[j];

    const isCoordinateBetweenEdges = ((edgeY1 > y) !== (edgeY2 > y)) &&
      (x < (edgeX2 - edgeX1) * (y - edgeY1) / (edgeY2 - edgeY1) + edgeX1);

    if (isCoordinateBetweenEdges) {
      isInside = !isInside;
    }
  }

  return isInside;
}

const findDistrict = (coordinate, ) => {
  
}

export default App;
