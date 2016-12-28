import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMyInfo, setTokens, getMyTracks, getConcerts}   from '../actions/actions';
import { getConcertsFirebase } from '../actions/firebase-actions';
import { routeActions } from 'react-router-redux';
import base from '../../../config/firebase';

import Loading from 'react-loading'

const _ = require('underscore');
const testList = ["The Lumineers", "Coldplay", "Drake", "Empire of the Sun"]
 
class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      tracks: {},
      totalTracks: 0,
      trackCalls: 0,
      artistsArray: [],
      artistsObj: {},
      getConcertsRan: false,
      runGetConcerts: false,
      concertsList: [],
      concertsDisplayList: {}, 
      artistsObjTM: {}, 
      artistsIdArray: [], 
      artistsIdString: '',
      style: {
        'margin-left': '20em',
        'border': '1em solid black'
      }
    }

    this.goToMainPage = this.goToMainPage.bind(this);
  }
 
  goToMainPage(evet) {
    let endpoint = '/main/' + this.props.user.id
    this.props.router.push(endpoint);
  }
  
  getData(){
    const {dispatch, params} = this.props;
    const {accessToken, refreshToken} = params;
    this.props.setTokens({accessToken, refreshToken})
    this.props.getMyInfo();
    this.props.getMyTracks();
  }
  
  syncFirebase() {
    this.ref = base.syncState(`users/${this.props.user.id}/userInfo`, {
      context: this,
      state: 'userInfo'
    });
    
    this.ref = base.syncState(`users/${this.props.user.id}/artistsArray`, {
      context: this,
      state: 'artistsArray',
      asArray: true
    });
    
    this.ref = base.syncState(`users/${this.props.user.id}/concertsDisplayList`, {
      context: this,
      state: 'concertsDisplayList'
    });
  }
 
  componentWillMount() {
    // running getData function to trigger setTokens, getMyInfo, and getMyTracks functions
    this.getData();    
  }
    
  componentWillReceiveProps(nextProps) {
    // set state for userInfo
    if(!this.state.userInfo.id && nextProps.user.id){
      this.setState({
        userInfo: nextProps.user
      });
    }
    
    // set state for tracks, totalTracks, and trackCalls
    if(!this.state.totalTracks && nextProps.totalTracks){
      this.setState({
        tracks: nextProps.tracks,
        totalTracks: nextProps.totalTracks,
        trackCalls: nextProps.trackCalls
      })
    }

    // setting state for artistArray and artistObj
    if(nextProps.artistsArray){
      this.setState({
        artistsArray: nextProps.artistsArray,
        artistsObj: nextProps.artistsObj
      })
    }

    // syncing to firebase once we know user id
    if(this.props.user.id){
      this.syncFirebase();
    }
    
    // running getConcerts function once we have entire artistsArray
    if(nextProps.totalTracks && nextProps.totalTracks === nextProps.tracksLoaded && this.state.runGetConcerts === false){         
      this.setState({runGetConcerts: true})
      // ########################################################
      // this.props.getConcerts(testList);
      this.props.getConcerts(nextProps.artistsArray);
      // ########################################################
    }
    
    // setting state for concertsList, etc, 
    if(nextProps.getConcertsRan){
      this.setState({
        concertsList: nextProps.concertsList,
        concertsDisplayList: nextProps.concertsDisplayList, 
        artistsObjTM: nextProps.artistsObjTM, 
        artistsIdArray: nextProps.artistsIdArray, 
        artistsIdString: nextProps.artistsIdString,
        getConcertsRan: nextProps.getConcertsRan 
      });
    }
    
  }
  
  componentDidUpdate(prevProps, prevState){
    // sending to Main Page once getConcerts function is ran    
    if(this.state.getConcertsRan && !prevState.getConcertsRan){
      console.log('ALL CONCERT INFO RECEIVED!!!!')
      this.goToMainPage();
    }
  }
  
  /** Render the user's info */
  render() {

    const { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsIdString, artistsIdArray, artistsObj, saveToFirebase  } = this.props;
    const { loading, display_name, images, id, email, external_urls, href, country, product } = user;
    const imageUrl = images[0] ? images[0].url : "";
    
    return (
      <div className="row">
        <div className="col-md-6 loading">
          Loading 
        </div>
        <div className="col-md-6">
          <Loading type="bars" color="e3e3e3" height={300} width={300} color={`#1ED760`} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { accessToken, refreshToken, user } = state.auth;
  const { tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded} = state.tracks
  const { concertsList, concertsDisplayList, artistsObjTM, artistsIdArray, artistsIdString, getConcertsRan } = state.concerts;
  return { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded, concertsList, concertsDisplayList, artistsObjTM, artistsIdArray, artistsIdString, getConcertsRan }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMyInfo, setTokens, getMyTracks, getConcerts, getConcertsFirebase, routeActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User);