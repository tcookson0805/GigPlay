import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMyInfo, setTokens, getMyTracks, getConcerts, getConcertsFirebase }   from '../actions/actions';

import Header from './header';
import MapBox from '../containers/map_box';
import ResultsBox from '../containers/results_box';
import ArtistList from '../containers/artist_list';


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      artistsArray: [],
      concertsDisplayList: []
    }
  }
  
  componentWillMount(){
    this.props.getConcertsFirebase(this, 'users/tcookson0805')
  }
  
  componentWillReceiveProps(nextProps){
    console.log('MAIN ------ nextProps', nextProps);
  }
  
  render() {
    return (
      <div>
        <div className="row">
          <Header />
        </div>
        <div className='row hero'>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <ResultsBox />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <MapBox />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <ArtistList />             
              </div>
            </div>
          </div>
        </div>
      </div>
    ) 
  } 
}

function mapStateToProps(state) {
  const { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded } = state.auth;
  const { concertsList, concertsDisplayList, filteredConcertsDisplayList, artistsObjTM, artistsIdArray, artistsIdString, saveToFirebase } = state.concerts;
  return { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded, concertsList, concertsDisplayList, filteredConcertsDisplayList, artistsObjTM, artistsIdArray, artistsIdString, saveToFirebase }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMyInfo, setTokens, getMyTracks, getConcerts, getConcertsFirebase }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);