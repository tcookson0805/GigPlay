import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMyInfo, setTokens, getMyTracks, getConcerts }   from '../actions/actions';
import { getConcertsFirebase, getUserInfoFirebase, getArtistsArrayFirebase } from '../actions/firebase-actions';
import base from '../../../config/firebase';


import Header from './header';
import MapBox from '../containers/map_box';
import ResultsBox from '../containers/results_box';
import ArtistList from '../containers/artist_list';

const _ = require('underscore');
const testList = ["The Lumineers", "Coldplay", "Drake", "Empire of the Sun"]


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      refreshToken: null,
      artistsArray: [],
      concertsDisplayList: {},
      userInfo: {},
      spotifyLoaded: false
    }
    this.getFirebase = this.getFirebase.bind(this);
  }
  
  syncFirebase() {

    const displayList = this.state.concertsDisplayListFirebase || this.state.concertsDisplayList;

    base.post(`users/${this.props.user.id}`, {
      data: {userInfo: this.state.user, artistsArray: this.state.artistsArray, concertsDisplayList: displayList},
      then(err) {
        if(!err){
          console.log('posted to Firebase');
        }
      }
    })
  }

  getFirebase() {
    const endpoint = 'users/' + this.props.params.userId;
    this.props.getArtistsArrayFirebase(this, endpoint)
    this.props.getConcertsFirebase(this, endpoint)
    this.props.getUserInfoFirebase(this, endpoint)
    this.setState({loaded: true});
  }
  
  componentWillMount(){
    // console.log('MAIN ----- componentWillMount this.props', this.props)
    // console.log('MAIN ----- componentWillMount this.state', this.state)

    // Step 1 - check to see if first visit
    if(this.props.accessToken){
      
      // update our state
      this.setState({
        accessToken: this.props.accessToken,
        refreshToken: this.props.refreshToken,
        user: this.props.user
      });
       
      // Step 2 - get data from Spotify and TicketMaster
      this.props.getMyTracks();
      
    } else {
      // get data from Firebase
      this.getFirebase();
    }
  }
  
  componentDidMount() {
    // console.log('MAIN ----- componentDIDMount this.props', this.props);
    // console.log('MAIN ----- componentDIDMount this.state', this.state)

  }
  
  componentWillReceiveProps(nextProps){
    // console.log('MAIN ----- componentWillReceiveProps nextProps', nextProps)
    // console.log('MAIN ----- componentWillReceiveProps this.props', this.props)
    // console.log('MAIN ----- componentWillReceiveProps this.state', this.state)

    // Step 3 - check to see if getTracks has returned
    if(nextProps.artistsArray) {
      
      if(!this.state.spotifyLoaded){
        // Step 4 -since spotifyLoaded state hasn't yet changed, we run getConcerts
        this.props.getConcerts(nextProps.artistsArray);      
      }

      // set our state to what getTracks has returned 
      // signal spotify has been Loaded which is important to prevent getConcerts from running mulitple times
      this.setState({
        totalTracks: nextProps.totalTracks,
        artistsArray: nextProps.artistsArray,
        artistsObj: nextProps.artistsObj,
        tracks: nextProps.tracks,
        spotifyLoaded: true
      })

    }

    // Step 5 - check to see if getConcerts has returned
    if(nextProps.concertsDisplayList) {
      this.setState({
        artistsObjTM: nextProps.artistsObjTM,
        concertsDisplayList: nextProps.concertsDisplayList
      })
    }

    if(nextProps.concertsDisplayListFirebase) {
      this.setState({
        concertsDisplayListFirebase: nextProps.concertsDisplayListFirebase
      })
    }

  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('MAIN ----- componentDidUpdate prevProps', prevProps)
    // console.log('MAIN ----- componentDidUpdate prevState', prevState)
    // console.log('MAIN ----- componentDidUpdate this.props', this.props)
    // console.log('MAIN ----- componentDidUpdate this.state', this.state)
    if(this.props.user.id){
      this.syncFirebase();
    }
    
  }

  
  render() {
    
    // console.log('MAIN ----- RENDER this.props', this.props)
    // console.log('MAIN ----- REnder this.state', this.state)

    return (
      <div>
        <div className="row">
          <Header />
        </div>
        <div className='row hero'>

          <div className="col-md-4">
            <div className="row">
              <ArtistList />
            </div>
          </div>
          
          <div className="col-md-8">
            <div className="row">
              <ResultsBox />
            </div>
            <div className="row">
              <MapBox />
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
