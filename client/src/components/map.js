import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Map, Marker, InfoWindow } from 'google-maps-react'

import { fetchCity } from '../actions/actions'


class ConcertMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      map: {},
      google: window.google,
      center: null
    }
  }
  
  componentWillMount() {
    this.setState({map : <Map google={window.google} zoom={10}><Marker onClick={this.onMarkerClick} name={'Current location'} /></Map>})
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({map : <Map google={window.google} initialCenter={nextProps.city.city.geometry.location} center={nextProps.city.city.geometry.location}><Marker onClick={this.onMarkerClick} name={'Current location'} /></Map>})
  }
  
  renderMap(){
    return this.state.map
  }
  
  render() {
    return (
      <div className="map">
        {this.renderMap()}
      </div>
    )
  }  
}


function mapStateToProps(state){
  return { city: state.city} 
}


export default connect(mapStateToProps)(ConcertMap);