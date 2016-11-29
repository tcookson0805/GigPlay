import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { bindActionCreators } from 'redux';
// import { getMyInfo, setTokens, getMyTracks, getMyArtists, getMyPlaylists, getPlaylistTracks }   from '../actions/actions';
import { getMyInfo, setTokens, getMyTracks }   from '../actions/actions';
const _ = require('underscore');


let artistArray = [];
let artistObj = {}

/**
 * Our user page
 * Displays the user's information
 */
class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      artists: [],
      artistsObj: {},
      num: 0,
      tracks: {}
    }
  }
 
  componentWillMount() {
    const {dispatch, params} = this.props;
    const {accessToken, refreshToken} = params;
    this.props.setTokens({accessToken, refreshToken});
    this.props.getMyInfo();
    this.props.getMyTracks(this.state.num);
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('================')
    console.log('componentWillReceiveProps')
    console.log('nextProps', nextProps);

    this.setState({total: nextProps.tracks.total})
    
    const arr = nextProps.tracks.items
    
    arr.forEach(function(item, index){
      
      let artistName = item.track.artists[0].name;
      
      artistArray.push(artistName)
      artistObj[artistName] = artistObj[artistName] + 1 || 1;
      
    });
    
    this.setState({tracks: nextProps.tracks})
    // this.setState({num: newNum})
    this.setState({artists: _.uniq(artistArray)})
    this.setState({artistsObj: artistObj})
  }

  
  componentDidUpdate(prevProps, prevState) {
    console.log('================');
    console.log('componentDidUpdate')
    console.log('this.state', this.state)
    // console.log('prevProps', prevProps);
    // console.log('prevState', prevState);



  }
  
 
  /** When we mount, get the tokens from react-router and initiate loading the info */

  /** Render the user's info */
  render() {
    const { accessToken, refreshToken, user, tracks } = this.props;
    const { loading, display_name, images, id, email, external_urls, href, country, product } = user;
    const { trackLoading, items, total, offset } = tracks
    const imageUrl = images[0] ? images[0].url : "";
  
    // if we're still loading, indicate such
    if (loading) {
      return <h2>Loading...</h2>;
    }
  
    return (
      <div className="user">
        <h2>{`Logged in as ${display_name}`}</h2>
        <div className="user-content">
          <img src={imageUrl} />
          <ul>
            <li><span>Display name: </span><span>{display_name}</span></li>
            <li><span>Id: </span><span>{id}</span></li>
            <li><span>Email: </span><span>{email}</span></li>
            <li><span>Spotify URI: </span><span><a href={external_urls.spotify}>{external_urls.spotify}</a></span></li>
            <li><span>Link: </span><span><a href={href}>{href}</a></span></li>
            <li><span>Profile Image: </span><span><a href={imageUrl}>{imageUrl}</a></span></li>
            <li><span>Country: </span><span>{country}</span></li>
            <li><span>Product: </span><span>{product}</span></li>
          </ul>
        </div>
        <div>
          <ul>
            {items.map(function(item, index) {
              return (
                <li key={index}>{item.track.artists[0].name}</li>
              )
            })}
          </ul>
        </div>
        <div>
          
        </div>
      </div>
    );

  }
}

function mapStateToProps(state) {
  const { accessToken, refreshToken, user, tracks } = state.auth;
  return { accessToken, refreshToken, user, tracks }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMyInfo, setTokens, getMyTracks }, dispatch);
}

// export default connect(state => state)(User);
export default connect(mapStateToProps, mapDispatchToProps)(User);