import React, { Component } from 'react';
import { connect } from 'react-redux';

import ConcertMap from '../components/map'

class MapBox extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log('MAPBOX this.props', this.props)
    const { concertsDisplayList, concertsDisplayListFirebase } = this.props;

    const displayList = concertsDisplayListFirebase || concertsDisplayList;

    if(!displayList){
      return (
        <div className="col-md-12 map-box">
          <div>
            <div className="loading">
              Loading 
            </div>
            
            <div className="loader">
              <img src="../../style/images/loading.svg" alt=""/>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="col-md-12 map-box">
        <ConcertMap />
      </div>
    )
  }  
}

function mapStateToProps(state) {
  const { concertsDisplayList, filteredConcertsDisplayList } = state.concerts;
  const { concertsDisplayListFirebase } = state.firebase;
  return { concertsDisplayList, filteredConcertsDisplayList, concertsDisplayListFirebase };
}

export default connect(mapStateToProps)(MapBox);
