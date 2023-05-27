import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, Navigate } from 'react-router-dom';
import ProtectedRoutes from './navigation/ProtectedRoutes';
import DangerMap from './pages/DangerMap';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import useLocalStorage, {userRoleKey} from './hooks/LocalStorageHook';

const geoUrl = "https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/miasta/wroclaw-max.geojson"

function App() {
  const userList = ['USER', 'ADMIN'];
  const [user, setUser, removeUser] = useLocalStorage(userRoleKey, "");
  const [isFirst, setFirst] = useState(true);

  const onUserChange = (u) => {
    setUser(u);
    console.log(u)
    console.log(user)
  }
  // useEffect(() => {
  //   if (isFirst) {
  //     sendCurrentLocation()
  //     setFirst(false)
  //   }
  // },
  // []
  // )
  
  const hiddenNavbarRoutes = []

  function getScreen (user, userScreen, adminScreen){
    switch(user) {
      case "USER":
        return userScreen;
      case "ADMIN":
          return adminScreen;
      default:
          return <Navigate to="/join_us" replace/>;
    }
  }
  
  function getLoggedOutScreen (user, screen){
    switch(user) {
      case "USER":
      case "ADMIN":
        return <Navigate to="/login" replace/>;
      default:
          return screen;
    }
  }

  function getLoggedInScreen (user, screen){
    if (userList.includes(user)) return screen;
    else return <Navigate to="/login" replace/>;
  }

  function getSingleScreen (chosenUser, user, screen) {
    if (chosenUser === user)
      return screen;
    else return <Navigate to="/login" replace/>;
  }

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes user={user} isHidden={hiddenNavbarRoutes.includes(window.location.pathname)} onLogout={() => removeUser()}/>}>
          {/*Logged out screens*/}
          <Route exact path="/register" element={getLoggedOutScreen(user, <Register />)} />
          <Route exact path="/login" element={getLoggedOutScreen(user, <Login onUserChange={(v) => setUser(v)}/>)} />
          
          {/*Logged in screens*/}
          <Route exact path="/" element={getLoggedInScreen(user, <Dashboard />)} />
          <Route exact path="/danger-map" element={getLoggedInScreen(user, <DangerMap />)} />
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

function inside(point, vs) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
  
  var x = point[0], y = point[1];
  
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      
      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  
  return inside;
};


const loadGeoData = async () => {

  let response = await fetch(geoUrl);

  if (response.status == 200) {
    let json = await response.json()
    return json
  } else {
    console.log("error")
  }
}

const findDistrict = async (coordinate) => {
  const data = await loadGeoData()
  console.log(data)
  const coordinates = data["features"]
  const district = coordinates.filter(
    (c) => {
      inside(coordinate, c["geometry"]["coordinates"][0])
    }
  )
  console.log(coordinate)

  console.log(district)

  return {
    latitude: coordinate[0],
    longitude: coordinate[1],
    district: district[0]["properties"]["osiedle"]
  }
}

const sendCurrentLocation = async () => {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  const { latitude, longitude } = position.coords;
  const coordinate = [longitude, latitude]

  const loc = await findDistrict(coordinate)
  console.log(loc)
}

export default App;
