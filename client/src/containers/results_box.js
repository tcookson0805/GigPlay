import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { bindActionCreators } from 'redux';

import ResultItem from '../components/result_item.js'

class ResultsBox extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      concertsList : [
        {
          artist: "Dave Mathews",
          date: "June 7, 2017",
          city: "Boston",
          state: "MA",
          time: "7:00PM",
          venue: "Fenway Park"
        },
        {
          artist: "Dave Mathews",
          date: "June 7, 2017",
          city: "Boston",
          state: "MA",
          time: "7:00PM",
          venue: "Fenway Park"
        },
        {
          artist: "Dave Mathews",
          date: "June 7, 2017",
          city: "Boston",
          state: "MA",
          time: "7:00PM",
          venue: "Fenway Park"
        },
        {
          artist: "Dave Mathews",
          date: "June 7, 2017",
          city: "Boston",
          state: "MA",
          time: "7:00PM",
          venue: "Fenway Park"
        },
        {
          artist: "Dave Mathews",
          date: "June 7, 2017",
          city: "Boston",
          state: "MA",
          time: "7:00PM",
          venue: "Fenway Park"
        },
        {
          artist: "Dave Mathews",
          date: "June 7, 2017",
          city: "Boston",
          state: "MA",
          time: "7:00PM",
          venue: "Fenway Park"
        },
        {
          artist: "Dave Mathews",
          date: "June 7, 2017",
          city: "Boston",
          state: "MA",
          time: "7:00PM",
          venue: "Fenway Park"
        },
        {
          artist: "Dave Mathews",
          date: "June 7, 2017",
          city: "Boston",
          state: "MA",
          time: "7:00PM",
          venue: "Fenway Park"
        }
      ]
    }
  }
  
  componentWillMount(){
    console.log('this.props ResultBox', this.props)

  }
  
  componentDidMount(){
    
  }
  
  componentWillReceiveProps(nextProps){
    console.log('nextProps ResultBox', nextProps);
  }
  
  render() {
    console.log('this.props', this.props)
    return (
      <div className="results-box col-md-12">
        <div className="row">
          <div className="results-box-header col-md-12">
            Results
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 results-group">
            {this.state.concertsList.map(function(concert, index) {
              return <ResultItem artist={concert.artist} date={concert.date} city={concert.city} state={concert.state} time={concert.time} venue={concert.venue} key={index} />
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