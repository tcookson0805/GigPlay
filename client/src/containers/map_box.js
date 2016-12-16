import React, { Component } from 'react';

import ConcertMap from '../components/map'
import GettingStartedExample from '../components/map_2';

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