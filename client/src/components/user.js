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
    this.props.router.push('/main');
  }
 
  /** When we mount, get the tokens from react-router and initiate loading the info */
  componentWillMount() {
    const {dispatch, params} = this.props;
    const {accessToken, refreshToken} = params;
    this.props.setTokens({accessToken, refreshToken});
    this.props.getMyInfo();
    this.props.getMyTracks();
    // this.props.getConcertsFirebase(this, 'users/tcookson0805');
  }
  
  componentDidMount(){
    console.log(' DID MOUNT this.props', this.props)
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    console.log('this.state', this.state);
    if(this.props.user.id !== null){
      this.setState({
        userInfo: nextProps.user,
        tracks: nextProps.tracks,
        totalTracks: nextProps.totalTracks, 
        trackCalls: nextProps.trackCalls, 
        artistsArray: nextProps.artistsArray,
        artistsObj: nextProps.artistsObj
      });
      
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
    

    if(nextProps.getConcertsRan){
      this.setState({
        concertsList: nextProps.concertsList,
        concertsDisplayList: nextProps.concertsDisplayList, 
        artistsObjTM: nextProps.artistsObjTM, 
        artistsIdArray: nextProps.artistsIdArray, 
        artistsIdString: nextProps.artistsIdString,
        getConcertsRan: nextProps.getConcertsRan 
      })
    }

    if(nextProps.totalTracks && nextProps.totalTracks === nextProps.tracksLoaded && this.state.runGetConcerts === false){   
      this.setState({runGetConcerts: true})
      console.log('hey ho')
      // ########################################################
      // this.props.getConcerts(testList);
      this.props.getConcerts(nextProps.artistsArray);
      // ########################################################
    } 

  }
  
  componentDidUpdate(prevProps, prevState){
    if(this.state.getConcertsRan){
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
  
    // return (
    //   <div className="user">
    //     <h2>{`Logged in as ${display_name}`}</h2>
    //     <div className="user-content">
    //       <img src={imageUrl} />
    //       <ul>
    //         <li><span>Display name: </span><span>{display_name}</span></li>
    //         <li><span>Id: </span><span>{id}</span></li>
    //         <li><span>Email: </span><span>{email}</span></li>
    //         <li><span>Spotify URI: </span><span><a href={external_urls.spotify}>{external_urls.spotify}</a></span></li>
    //         <li><span>Link: </span><span><a href={href}>{href}</a></span></li>
    //         <li><span>Profile Image: </span><span><a href={imageUrl}>{imageUrl}</a></span></li>
    //         <li><span>Country: </span><span>{country}</span></li>
    //         <li><span>Product: </span><span>{product}</span></li>
    //       </ul>
    //     </div>
    //     <div>
    //       <button onClick={this.goToMainPage}>Go To Main Page</button>
    //     </div>
    //   </div>
    // );
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