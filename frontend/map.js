mapboxgl.accessToken =
  'pk.eyJ1IjoidHphZ29yIiwiYSI6ImNrNjNnYTZodzA2azMzaXVhbHgwZmVnb2sifQ.QFeTFSJwKEBI-wtFQEQqtQ'
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9'
})

var size = 100

// implementation of CustomLayerInterface to draw a pulsing dot icon on the map
// see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
var pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  // get rendering context for the map canvas when layer is added to the map
  onAdd: function() {
    var canvas = document.createElement('canvas')
    canvas.width = this.width
    canvas.height = this.height
    this.context = canvas.getContext('2d')
  },

  // called once before every frame where the icon will be used
  render: function() {
    var duration = 1000
    var t = (performance.now() % duration) / duration

    var radius = (size / 2) * 0.3
    var outerRadius = (size / 2) * 0.7 * t + radius
    var context = this.context

    // draw outer circle
    context.clearRect(0, 0, this.width, this.height)
    context.beginPath()
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(0, 204, 255,' + (1 - t) + ')'
    context.fill()

    // draw inner circle
    context.beginPath()
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(0, 102, 128, 1)'
    context.strokeStyle = 'white'
    context.lineWidth = 2 + 4 * (1 - t)
    context.fill()
    context.stroke()

    // update this image's data with data from the canvas
    this.data = context.getImageData(0, 0, this.width, this.height).data

    // continuously repaint the map, resulting in the smooth animation of the dot
    map.triggerRepaint()

    // return `true` to let the map know that the image was updated
    return true
  }
}

let COORDS = []

navigator.geolocation.getCurrentPosition(function(location) {
  console.log(location.coords.latitude)
  console.log(location.coords.longitude)
  console.log(location.coords.accuracy)
  COORDS[0] = location.coords.longitude
  COORDS[1] = location.coords.latitude
  // setCoordinates(location.coords.latitude, location.coords.longitude)
})

map.on('load', function() {
  map.addImage('pulsing-dot', pulsingDot, {
    pixelRatio: 2
  })

  map.addSource('points', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: COORDS
          }
        }
      ]
    }
  })
  map.addLayer({
    id: 'points',
    type: 'symbol',
    source: 'points',
    layout: {
      'icon-image': 'pulsing-dot'
    }
  })
})

// map.on('load', drawDot(0, 0))
