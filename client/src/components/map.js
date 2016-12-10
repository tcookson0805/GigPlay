import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, Marker, InfoWindow, GoogleApiComponent } from 'google-maps-react'
import base from '../../../config/firebase';

// import GoogleMap from 'google-map-react';

const googleApiKey = 'AIzaSyCuNBC8C1JNqGkZfHuUHjjEbMa-aooZMoc';

import { fetchCity } from '../actions/actions'

class ConcertMap extends Component {
    
  constructor(props){
    super(props);
    this.state = {
      google: window.google,
      zoom: 4,
      initialCenter: {
        lat: 37.09024,
        lng: -95.712891
      },
      style: {
        width: '91%',
        height: '70%',
        position: 'relative'
      },
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      concertsDisplayList: []
    }
    
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  
  onMarkerClick(props, marker, e){
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }


  render() {
    
    let that = this;
    
    if(!this.props.concertsDisplayList){
      return <div>loading....</div>
    }
    
    return(
      <div className="row">
        <div className="map">
          <Map google={this.state.google} onClick={this.onMapClicked} initialCenter={this.state.initialCenter} zoom={this.state.zoom} style={this.state.style}>
           {this.props.concertsDisplayList.map(function(concert, index) {
              return (
                <Marker
                  onClick={that.onMarkerClick}
                  artist={concert.artist}
                  venue={concert.venue}
                  city={concert.city}
                  state={concert.state}
                  date={concert.date}
                  time={concert.time} 
                  position={{'lat':concert.lat, 'lng':concert.long}}
                  event={concert.event}
                  url={concert.url} 
                  key={index} 
                />
              )
            })}
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
                <div className='map-info-window'>
                  <h1><strong>{this.state.selectedPlace.artist}</strong></h1>
                  <p>{this.state.selectedPlace.event}</p>
                  
                  <div>
                    <strong>Venue:</strong> {this.state.selectedPlace.venue}
                  </div>
                  <div><strong>Date:</strong> {this.state.selectedPlace.date}</div>
                  <div><strong>Time:</strong> {this.state.selectedPlace.time}</div>
                  <div>
                    <a href={this.state.selectedPlace.url} target="_blank">
                      <img src="../../style/images/ticket2.png" height="40em" alt=""/>
                    </a>
                  </div>
                </div>
            </InfoWindow> 
          </Map>                 
        </div>
      </div>
    )
  }  
}

function mapStateToProps(state) {
  const { concertsDisplayList } = state.concerts;
  return { concertsDisplayList };
}

export default connect(mapStateToProps)(ConcertMap);