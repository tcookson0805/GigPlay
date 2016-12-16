import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMyInfo, setTokens, getMyTracks, getConcerts }   from '../actions/actions';
import { getConcertsFirebase, getUserInfoFirebase, getArtistsArrayFirebase } from '../actions/firebase-actions';

import Header from './header';
import MapBox from '../containers/map_box';
import ResultsBox from '../containers/results_box';
import ArtistList from '../containers/artist_list';


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      artistsArray: [],
      concertsDisplayList: {},
      userInfo: {}
    }
  }
  
  componentWillMount(){
    this.props.getArtistsArrayFirebase(this,'users/tcookson0805')
    this.props.getConcertsFirebase(this,'users/tcookson0805')
    this.props.getUserInfoFirebase(this,'users/tcookson0805')

  }
  
  componentDidMount() {
    // console.log(this.props)
  }
  
  componentWillReceiveProps(nextProps){
    // console.log('MAIN ------ nextProps', nextProps);
  }
  
  render() {
    
    return (
      <div>
        <div className="row">
          <Header />
        </div>
        <div className='row hero'>
          <div className="col-md-8">
            <div className="row">
              <ResultsBox />
            </div>
            <div className="row">
              <MapBox />
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <ArtistList />
            </div>
          </div>
        </div>
      </div>
    )
  } 
}

function mapStateToProps(state) {
  const { accessToken, refreshToken, user } = state.auth;
  const { tracks, totalTracks, artistsArray, artistsObj} = state.tracks
  const { concertsDisplayList, artistsObjTM, saveToFirebase } = state.concerts;
  const { artistsArrayFirebase, concertsDisplayListFirebase, userInfoFirebase } = state.firebase;
  
  return { accessToken, refreshToken, user, tracks, totalTracks, artistsArray, artistsObj, concertsDisplayList, artistsObjTM, saveToFirebase, artistsArrayFirebase, concertsDisplayListFirebase, userInfoFirebase }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMyInfo, setTokens, getMyTracks, getConcerts, getConcertsFirebase, getUserInfoFirebase, getArtistsArrayFirebase }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);