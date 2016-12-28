import React, { Component } from 'react';
import ConcertMap from '../components/map'

class MapBox extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="col-md-12 map-box">
        <ConcertMap />
      </div>
    )
  }  
}

export default MapBox;