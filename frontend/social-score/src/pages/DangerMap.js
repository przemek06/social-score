import React, { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { scaleLinear } from "d3-scale";

const data = '{"district": [{"id": "Krzyki - Partynice","rating": "8"},{"id": "Sołtysowice","rating": "6"}]}';

const json = JSON.parse(data);
console.log(json)
console.log(json.district)

const geoUrl = "https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/miasta/wroclaw-max.geojson"
// poland map -> "https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/wojewodztwa/wojewodztwa-max.geojson"

export default function DangerMap({mapUrl}) {
const [position, setPosition] = useState({coordinates:[16.89,51.11], zoom:58})

  const handleMoveEnd = (pos) => {
    console.log(pos);
    setPosition(pos);
  }

  window.onload = () => {
    console.log(position);
    setPosition({coordinates:[-15,51], zoom: position.zoom })
  };

  const colorScale = scaleLinear().domain([0, 10]).range(["#a72bb5","#0376db"])
  const regions = json.district

  return (
    <div>
      {/* width={800} height={600} */}
    <ComposableMap projection="geoAlbers" projectionConfig={{center:[15,50], scale: 1500}} > 
      <ZoomableGroup zoom={position.zoom} center={position.coordinates} position={position.coordinates} onMoveEnd={handleMoveEnd}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const regionColors = regions.find((s) => s.id === geo.properties.osiedle)
            return (
              <Geography key={geo.rsmKey} geography={geo} fill={regionColors ? colorScale(regionColors.rating) : "#333"}/>
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
