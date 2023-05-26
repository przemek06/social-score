import React, { useState } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"


const geoUrl =
  "https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/wojewodztwa/wojewodztwa-max.geojson"

export default function DangerMap({mapUrl}) {
const [position, setPosition] = useState({coordinates:[0,0], zoom:1})

  const handleMoveEnd = (pos) => {
    setPosition(pos);
  }

  return (
    <ComposableMap projection="geoMercator" width={800} height={600}>
      <ZoomableGroup zoom={position.zoom} position={position.coordinates} onMoveEnd={handleMoveEnd}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  )
}
