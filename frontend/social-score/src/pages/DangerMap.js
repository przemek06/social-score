import React, { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { scaleLinear } from "d3-scale";

const data = '{"district": [{"id": "Krzyki - Partynice","rating": "8"},{"id": "Sołtysowice","rating": "6"}]}';

const json = JSON.parse(data);
console.log(json)
console.log(json.district)

function getRandomNumber() {
  // Generate a random decimal number between 0 and 1
  const random = Math.random();

  // Scale the random number to the desired range
  const range = 10 - 5 + 1; // 10 is the maximum value, 5 is the minimum value
  const scaledNumber = Math.floor(random * range);

  // Add the minimum value to the scaled number to shift the range
  const randomNumber = scaledNumber + 5;

  return randomNumber;
}

const geoUrl = "https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/miasta/wroclaw-max.geojson"
// poland map -> "https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/wojewodztwa/wojewodztwa-max.geojson"

const loadGeoData = async () => {

  let response = await fetch(geoUrl);

  if (response.status == 200) {
    let json = await response.json()
    return json
  } else {
    console.log("error")
  }
}

const parseDistricts = async (setDistricts) => {
  let json = await loadGeoData()
  let os = json["features"].map(
    f => f["properties"]["osiedle"]
  )

  setDistricts(osiedle)
}

const mapDistricts = (districts, setData) => {
  a =  districts.map(d => {
    return {id: d, rating: Math.random() * 10}
  }
  )
  setData(a)
}

export default function DangerMap() {
  const [position, setPosition] = useState({ coordinates: [16.89, 51.11], zoom: 58 })
  const [time, setTime] = useState(5)
  const [districts, setDistricts] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    parseDistricts(setDistricts)
    const interval = setInterval(() => {
      mapDistricts(districts, setData)
      time = 1000 * getRandomNumber()
    }, time); 
    return () => {
      clearInterval(interval);
    };
  }, []);


  const handleMoveEnd = (pos) => {
    console.log(pos);
    setPosition(pos);
  }

  window.onload = () => {
    console.log(position);
    setPosition({ coordinates: [-15, 51], zoom: position.zoom })
  };

  const colorScale = scaleLinear().domain([0, 10]).range(["#a72bb5", "#0376db"])
  const regions = data

  return (
    <div>
      {/* width={800} height={600} */}
      <ComposableMap projection="geoAlbers" projectionConfig={{ center: [15, 50], scale: 1500 }} >
        <ZoomableGroup zoom={position.zoom} center={position.coordinates} position={position.coordinates} onMoveEnd={handleMoveEnd}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const regionColors = regions.find((s) => s.id === geo.properties.osiedle)
                return (
                  <Geography key={geo.rsmKey} geography={geo} fill={regionColors ? colorScale(regionColors.rating) : "#333"} />
                );
              }
              )
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

    </div>

  )
}
