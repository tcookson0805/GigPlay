import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { bindActionCreators } from 'redux';
import base from '../../../config/firebase';

import ResultItem from '../components/result_item.js'

class ResultsBox extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.loadFirebaseEndpoint = this.loadFirebaseEndpoint.bind(this);
  }
  
  loadFirebaseEndpoint(endpoint){
    base.fetch(endpoint, {
      context: this
    }).then(data => {
      console.log('DATA', data)
      this.setState({
        artistsArray: data.artistsArray,
        concertsDisplayList: data.concertsDisplayList
      })
    })
  }
  
  componentWillMount(){
    // if(this.props.concertsDisplayList){
    //   this.setState({concertsDisplayList: this.props.concertsDisplayList});
    // }
    this.loadFirebaseEndpoint('users/tcookson0805');    
  }
   
  render() {
      
    if(!this.state.concertsDisplayList){
      return <div>loading....</div>
    }
    
    // return (
    //   <div className="results-box col-md-8">
    //     <div className="row">
    //       <div className="results-box-header col-md-12">
    //         Results
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="col-md-12 results-group">
    //         {this.state.concertsDisplayList.map(function(concert, index) {              
    //           return <ResultItem artist={concert.artist} date={concert.date} city={concert.city} state={concert.state} time={concert.time} venue={concert.venue} key={index} />
    //         })}
    //       </div>
    //     </div>
    //   </div>
    // )
    return (
      <div className="results-box col-md-12">
        <div className="row">
          <div className="results-box-header col-md-12">
            Results
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 results-group">
            {this.state.concertsDisplayList.map(function(concert, index) {              
              return (
                <ResultItem 
                  artist={concert.artist} 
                  date={concert.date} 
                  city={concert.city} 
                  state={concert.state} 
                  time={concert.time} 
                  venue={concert.venue}
                  url={concert.url}
                  event={concert.event}
                  key={index} 
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }  
}

function mapStateToProps(state) {
  const { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded } = state.auth;
  const { data, concertsList } = state.concerts;
  return { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded, data, concertsList }
}

export default connect(mapStateToProps)(ResultsBox);