import React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Posizioni from './location/locations.json'

class ZMap extends React.Component {
  constructor() {
    super()
    this.state = {
      markers: [[35.6892, 51.389]]
    }
  }

  addMarker = e => {
    console.log('maker added')

    const { markers } = this.state
    //markers.pop()
    markers.push(e.latlng)
    this.setState({ markers })
  }

  render() {
    return (
      <Map center={[45.5388, 10.2202]} zoom={12} onClick={this.addMarker}>
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          attribution='&copy; <a href="http://www.bevia.ml">D35P4C1T0</a>'
          minZoom={2}
          maxZoom={17}
        />
        {this.state.markers.map((position, idx) => (
          <Marker key={`marker-${idx}`} position={position}></Marker>
        ))}
      </Map>
    )
  }
}

export default ZMap
