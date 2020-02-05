import React from 'react'
import ZMap from './ZMap'
import './App.css'

// function App() {
//   navigator.geolocation.getCurrentPosition(function(location) {
//     console.log(location.coords.latitude)
//     console.log(location.coords.longitude)
//     console.log(location.coords.accuracy)
//   })

//   //console.log(Posizioni)
//   let CoordsArray = new Array(Posizioni)
//   //console.log(CoordsArray)

//   CoordsArray.forEach(elements => {
//     console.log(elements)
//   })

//   return (
//     <Map center={[45.5388, 10.2202]} zoom={12}>
//       <TileLayer
//         url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
//         attribution='&copy; <a href="http://www.bevia.ml">D35P4C1T0</a>'
//         minZoom={2}
//         maxZoom={17}
//       />
//       {/* <Marker position={[45.5388, 10.2202]}>
//         <Popup>{frase}</Popup>
//       </Marker> */}
//       {this.state.markers.map((position, idx) => (
//         <Marker key={`marker-${idx}`} position={position}></Marker>
//       ))}
//     </Map>
//   )
// }

function App() {
  return <ZMap />
}

export default App
