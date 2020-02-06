import React, { useState } from 'react'
import Posizioni from './location/locations.json'
import { Map, TileLayer, Marker, Popup, withLeaflet } from 'react-leaflet'
import { ReactLeafletSearch as RLSearch } from 'react-leaflet-search'

class ZMap extends React.Component {
  constructor() {
    super()
    this.state = {
      markers: [],
      infos: []
    }
  }

  serverFetch = url => {
    fetch(url)
      .then(resp => resp.json()) // Transform the data into json
      .then(function(data) {
        // Create and append the li's to the ul
      })
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
    const WrappedSearch = withLeaflet(RLSearch)

    return (
      <Map center={[45.5388, 10.2202]} zoom={5} onClick={this.fetchJsonCoords}>
        <TileLayer
          url='https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey={apikey}'
          attribution='&copy; <a href="http://www.bevia.ml">D35P4C1T0</a>'
          minZoom={2}
          maxZoom={17}
          ext='png'
          apikey='db5ae1f5778a448ca662554581f283c5' // thunderforest apikey ;D
        />

        <WrappedSearch
          position='topleft'
          zoom={10}
          search={[56, 45.656]}
          showMarker={true}
          showPopup={true}
          inputPlaceholder={'Search Location or Latitude, Longitude'}
          closeResultsOnClick={true}
          provider='BingMap'
          providerOptions={{
            providerKey:
              'ApXYMoHp_PTC0InMDn39AI9v9igNMtjApkoRS3X5et8uyi6TsW_Bm_WD-OEgVNaa'
          }}
          // popUp={this.customPopup}
        />

        {this.state.markers.map((position, idx) => (
          <Marker
            key={`marker-${idx}`}
            position={position}
            onMouseOver={e => {
              e.target.openPopup()
            }}
            onMouseOut={e => {
              e.target.closePopup()
            }}
          >
            <Popup>{this.state.infos[idx]}</Popup>
          </Marker>
        ))}
      </Map>
    )
  }
}

export default ZMap
