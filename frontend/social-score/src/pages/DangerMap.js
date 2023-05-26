import React, { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { scaleLinear } from "d3-scale";


const geoUrl = "https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/miasta/wroclaw-max.geojson"
  // "https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/wojewodztwa/wojewodztwa-max.geojson"

export default function DangerMap({mapUrl}) {
const [position, setPosition] = useState({coordinates:[16.87,51.11], zoom:58})

  function handleZoomIn() {
    setPosition({ ...position, zoom: position.zoom * 2 });
  }

  function handleZoomOut() {
    setPosition({ ...position, zoom: position.zoom / 2 });
  }

  const handleMoveEnd = (pos) => {
    console.log(pos);
    setPosition(pos);
  }

  window.onload = () => {
    console.log(position);
    setPosition({coordinates:[-15,51], zoom: position.zoom })
  };

  const colorScale = scaleLinear().domain([0,100]).range(["a72bbp","0376db"])
  const regions = []  // TODO: fill with data about crimes/dangerous people in given region of wroclaw

  return (
    <div>
      {/* TODO: doesn't work */}
      <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
      {/* width={800} height={600} */}
    <ComposableMap projection="geoAlbers" projectionConfig={{center:[15,50], scale: 1500}} > 
      <ZoomableGroup zoom={position.zoom} center={position.coordinates} position={position.coordinates} onMoveEnd={handleMoveEnd}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const regionColors = regions.find((s) => s.id === geo.properties.ISO_A3)
            return <Geography key={geo.rsmKey} geography={geo} fill={regionColors ? colorScale(regions['number']) : "#333"}/>
          }
          )
        }
      </Geographies>
      </ZoomableGroup>
    </ComposableMap>
    
    </div>
    
  )
}
