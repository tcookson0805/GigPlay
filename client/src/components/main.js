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
      userInfo: {},
      loaded: false
    }
    this.getFirebase = this.getFirebase.bind(this);
  }
  
  getFirebase() {
    const endpoint = 'users/' + this.props.params.userId;
    this.props.getArtistsArrayFirebase(this, endpoint)
    this.props.getConcertsFirebase(this, endpoint)
    this.props.getUserInfoFirebase(this, endpoint)
    this.setState({loaded: true});
  }
  
  componentWillMount(){
    console.log('MAIN ----- componentWillMount this.props', this.props)
    
    console.log('this.props', this.props)
    const endpoint = 'users/' + this.props.params.userId;
    this.props.getArtistsArrayFirebase(this, endpoint)
    this.props.getConcertsFirebase(this, endpoint)
    this.props.getUserInfoFirebase(this, endpoint)
    this.setState({loaded: true});
  }
  
  componentDidMount() {
    console.log('MAIN ----- componentDIDMount this.props', this.props)
  }
  
  componentWillReceiveProps(nextProps){

    // if(nextProps.user.id && !this.state.loaded){
    //   console.log('RUN THE STUFF HERE!!!')
    //   console.log('this.props', this.props)
    //   const endpoint = 'users/' + nextProps.user.id
    //   this.props.getArtistsArrayFirebase(this, endpoint)
    //   this.props.getConcertsFirebase(this, endpoint)
    //   this.props.getUserInfoFirebase(this, endpoint)
    //   this.setState({loaded: true});
    // }    

    console.log('MAIN ------ nextProps', nextProps);
  }
  
  render() {
    
    console.log('MAIN ------ render this.props', this.props)
    
    // if(!this.props.concertsDisplayListFirebase){
    //   return <div>loading...</div>
    // }
    
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