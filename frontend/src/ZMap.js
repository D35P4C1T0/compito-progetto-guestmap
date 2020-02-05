import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Posizioni from './location/locations.json'

class ZMap extends React.Component {
  constructor() {
    super()
    this.state = {
      markers: [],
      infos: []
    }
  }

  addMarker = e => {
    //element, e.latlng
    //JSON.stringify(obj1) === JSON.stringify(obj2)
    const { markers } = this.state
    markers.push(e.latlng)
    this.setState({ markers })

    const { infos } = this.state
    infos.push(e.info)
    this.setState({ infos })
  }

  fetchJsonCoords = () => {
    const { markers } = this.state
    //console.log(markers)

    Object.values(Posizioni).forEach(element => {
      let doAdd = true // si spiega da solo direi
      let spot = {
        latlng: { lat: element.latitude, lng: element.longitude },
        info: element.info
      }

      //console.log(element.info)

      markers.forEach(element => {
        if (
          doAdd === true &&
          JSON.stringify(element) === JSON.stringify(spot.latlng)
        ) {
          //  se vedo che lo spot che si vuole inserire
          //  è già presente, allora non lo inserisco
          doAdd = false
          //  Sto lerciume potrebbe diventare difficle quando
          //  si hanno migliaia di markers :(
          //  Buona fortuna ai posteri
        }
      })

      if (markers.length < 1) {
        //console.log('cazzo, è vuoto ' + markers.length)
        doAdd = true
      }

      if (doAdd) {
        this.addMarker(spot)
        // la condizione è semplicemente doAdd, vera di default, che
        // si macchia appena qualcosa non quadra
      }
    })
  }

  render() {
    return (
      <Map center={[45.5388, 10.2202]} zoom={5} onClick={this.fetchJsonCoords}>
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          attribution='&copy; <a href="http://www.bevia.ml">D35P4C1T0</a>'
          minZoom={2}
          maxZoom={17}
        />
        {this.state.markers.map((position, idx) => (
          <Marker key={`marker-${idx}`} position={position}>
            <Popup>{this.state.infos[idx]}</Popup>
          </Marker>
        ))}
      </Map>
    )
  }
}

export default ZMap
