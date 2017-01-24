import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, Marker, InfoWindow, GoogleApiComponent } from 'google-maps-react'
import base from '../../../config/firebase';

// import GoogleMap from 'google-map-react';

import googleApiKey from '../../../config/google';



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

      },
      containerStyle: {
        height: '40em',
        width: '100%'
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

  componentWillUpdate(nextProps) {
    // console.log('MAP nextProps', nextProps)
  }

  render() {
    
    let { concertsDisplayList, concertsDisplayListFirebase } = this.props;
    
    let displayList = concertsDisplayListFirebase || concertsDisplayList;
    console.log('displayList', displayList);
    let that = this;
    let list;
    
    if(!displayList){
      return <div>loading....</div>
    }
    
    if(displayList.filteredList && displayList.filteredList.length){
      list = displayList.filteredList
    } else {
      list = displayList.totalList
    }
    
    return(
      <div className="row">
        <div className="map">
          <Map google={this.state.google} onClick={this.onMapClicked} initialCenter={this.state.initialCenter} zoom={this.state.zoom} style={this.state.style} containerStyle={this.state.containerStyle}>
           {list.map(function(concert, index) {

              var yy = concert.date.slice(0,4);
              var mm = concert.date.slice(5,7);
              var dd = concert.date.slice(8,10);

              var months = {
                '01': 'January',
                '02': 'February',
                '03': 'March',
                '04': 'April',
                '05': 'May',
                '06': 'June',
                '07': 'July',
                '08': 'August',
                '09': 'September',
                '10': 'October',
                '11': 'November',
                '12': 'December'
              }

              var date = months[mm] + ' ' + dd + ', ' + yy;

              if(concert.state){
                var location = concert.city + ', ' + concert.state;
              } else {
                var location = concert.city
              }

              return (
                <Marker
                  onClick={that.onMarkerClick}
                  artist={concert.artist}
                  venue={concert.venue}
                  city={concert.city}
                  state={concert.state}
                  date={date}
                  time={concert.time} 
                  position={{'lat':concert.lat, 'lng':concert.long}}
                  event={concert.event}
                  url={concert.url} 
                  key={index} 
                />
              )
            })}
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} class='infoMarker'>
                <div className='map-info-window'>
                  
                  <div className="map-info-window-artist">
                    <h1>{this.state.selectedPlace.artist}</h1>
                  </div>
                  
                  <div>
                    <strong>Venue:</strong> {this.state.selectedPlace.venue}
                  </div>

                  <div>
                    <strong>Date:</strong> {this.state.selectedPlace.date}
                  </div>
                  
                  
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
  const { concertsDisplayList, filteredConcertsDisplayList } = state.concerts;
  const { concertsDisplayListFirebase } = state.firebase;
  return { concertsDisplayList, filteredConcertsDisplayList, concertsDisplayListFirebase };
}

export default connect(mapStateToProps)(ConcertMap);