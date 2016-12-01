import React, { Component } from 'react';

import ConcertMap from '../components/map'

class MapBox extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log('map-box props', this.props);
    return (
      <div className="map-box col-md-12">
        <ConcertMap />
      </div>
    )
  }
  
}


export default MapBox;