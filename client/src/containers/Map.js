import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

class Map extends Component {
  constructor() {
    super()
    this.state = {
        photos: [],
        active_marker: null,
      }
    }

  mapMoved() {
    let updatedState = Object.assign({}, this.state)
    updatedState.active_marker = null
    this.setState(updatedState)
    let location = {
      lat: this.state.map.getCenter().lat(),
      lng: this.state.map.getCenter().lng()
    }
    this.props.updateMarkers(location)
  }

  render() {
    const mapContainer = <div style = {{height: '100%', width: '100%'}}></div>
    const markers = this.props.markers.map((marker, i) => {
      return <Marker
                key={i}
                {...marker}
                onClick={() => {this.onMarkerClick(marker)}}/>
    })




    return (
          <GoogleMapLoader
            containerElement = { mapContainer }
            googleMapElement = {
              <GoogleMap
                ref = { (map) => {
                  if (this.state.map != null)
                    return
                  this.setState({
                    map: map
                  })
                }}
                onDragend={this.mapMoved.bind(this)}
                defaultZoom={15}
                defaultCenter={this.props.center}
                options={{streetViewControl: false, mapTypeControl: false, styles: [{"elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#000000"}]},{"featureType":"landscape","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{}]}} >
                { markers }
              </GoogleMap>
            }/>
      )
  }
}

export default Map
