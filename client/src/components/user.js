import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMyInfo, setTokens, getMyTracks, getConcerts}   from '../actions/actions';
import { getConcertsFirebase } from '../actions/firebase-actions';
import { routeActions } from 'react-router-redux';
import base from '../../../config/firebase';

console.log(process.env.FIREBASE_AUTH_DOMAIN);

import Loading from 'react-loading';

const _ = require('underscore');
const testList = ["The Lumineers", "Coldplay", "Drake", "Empire of the Sun"];
 
class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      refreshToken: null,
      user: {}
    }
    this.goToMainPage = this.goToMainPage.bind(this);
  }
 
  goToMainPage(evet) {
    let endpoint = '/main/' + this.props.user.id
    this.props.router.push(endpoint);
  }
  
  getData() {
    const {dispatch, params} = this.props;
    const {accessToken, refreshToken} = params;
    this.props.setTokens({accessToken, refreshToken});
    this.props.getMyInfo();
  }
  
  componentWillMount() {
    // running getData function to trigger setTokens, getMyInfo, and getMyTracks functions
    this.getData();
  }
    
  componentWillReceiveProps(nextProps) {

    if(nextProps.accessToken){
      this.setState({
        accessToken: nextProps.accessToken
      });
    }

    if(nextProps.refreshToken){
      this.setState({
        refreshToken: nextProps.refreshToken
      });
    }

    if(nextProps.user.id){
      this.setState({
        user: nextProps.user
      });
    }

  }
  
  componentDidUpdate(prevProps, prevState){
    if(this.state.user.id){
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
  return { accessToken, refreshToken, user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMyInfo, setTokens, routeActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(User);