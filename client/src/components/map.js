import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Map, Marker, InfoWindow, GoogleApiComponent } from 'google-maps-react'

// import GoogleMap from 'google-map-react';

const googleApiKey = 'AIzaSyCuNBC8C1JNqGkZfHuUHjjEbMa-aooZMoc';



import { fetchCity } from '../actions/actions'

class ConcertMap extends Component {
    
  constructor(props){
    super(props);
  
    console.log('this.props', this.props)
  
    this.state = {
      google: window.google,
      zoom: 4,
      initialCenter: {
        lat: 37.09024,
        lng: -95.712891
      },
      style: {
        width: '56em',
        height: '20em',
        position: 'relative'
      }
    }
  }

  render() {
    console.log('this.props', this.props)
    
    return (
      <div className="row">
        <div className="map">
          <Map google={this.state.google} initialCenter={this.state.initialCenter} zoom={this.state.zoom} style={this.state.style}>

          </Map>                    
        </div>
      </div>
    )
    
    // return (
    //   <div className="row">
    //     <div className="map">
    //       <Map google={this.state.google} initialCenter={this.state.initialCenter} zoom={this.state.zoom} style={this.state.style}>
    //       {this.props.concertsList.map(function(concert, index) {
    //         return (
    //           <Marker name={concert.artist} position={{'lat':concert.lat, 'lng':concert.long}} key={index} />
    //         )
    //       })}
    //       </Map>                    
    //     </div>
    //   </div>
    // )
  }  
}


// function mapStateToProps(state){
//   return { city: state.city } 
// }

function mapStateToProps(state) {
  const { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded } = state.auth;
  const { data, concertsList } = state.concerts;
  return { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded, data, concertsList }
}

// export default GoogleApiComponent({apiKey: 'AIzaSyCuNBC8C1JNqGkZfHuUHjjEbMa-aooZMoc'})(ConcertMap)
export default connect(mapStateToProps)(ConcertMap);