import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavDropdown, MenuItem, Row, Col, Nav } from 'react-bootstrap'

import SearchBox from '../containers/search_box';
import { getUserInfoFirebase } from '../actions/firebase-actions';

class Header extends Component {
  
  constructor(props){
    super(props)
  }
  
  componentWillMount() {
    // console.log('this.props.user.display_name', this.props.user.display_name )
    // this.props.getUserInfoFirebase(this,'users/tcookson0805')
  }
  
  componentWillReceiveProps(nextProps){
    // console.log('nexProps', nextProps)
  }
  
  render(){
  
    let { user, userInfoFirebase } = this.props
    
    if(!user.display_name){
      user = userInfoFirebase
    }
    // console.log('user', user)
    // console.log('userInfoFirebase', userInfoFirebase)
    
    if(!user){
      return <div></div>
    }

    return (
      <div className="header col-md-12">
        <div className="row">
          <div className="col-md-12">
            <div className="header-logo">
              <img src="../../style/images/Gigplay-logo-1x.png" alt="Gigplay Logo"/>
            </div>
            <div className="header-user">
              
              <div className="header-user-pic">
                <img src="../../style/images/Spotify_Icon_RGB_Green.png" alt="" className="header-user-pic-spotify" />
                <img src={user.images[0].url} alt="" className="header-user-pic-image" />
              </div>
              
              <div className="header-user-dropdown">
                {user.display_name}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) 
    
  }

}

function mapStateToProps(state) {
  const { user } = state.auth
  const { userInfoFirebase } = state.firebase
  return { user, userInfoFirebase }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserInfoFirebase }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);