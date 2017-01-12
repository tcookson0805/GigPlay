import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavDropdown, MenuItem, Row, Col, Nav } from 'react-bootstrap'

import SearchBox from '../containers/search_box';
import { getUserInfoFirebase } from '../actions/firebase-actions';

class Header extends Component {
  
  constructor(props){
    super(props);
  }
  
  componentWillMount() {
    // console.log('HEADER ------ this.props', this.props)
  }
  
  componentWillReceiveProps(nextProps) {
    // console.log('HEADER ------ this.props', this.props)
    // console.log('HEADER ------ nextProps', nextProps)
  }
  
  render(){
  
    let { user, userInfoFirebase } = this.props
    
    let userInfo = user.display_name ? user : userInfoFirebase
    
    // console.log('HEADER ------ userInfo', userInfo)
    
    if(!userInfo){
      return <div></div>
    } else {
      const image = userInfo.images ? userInfo.images[0].url : '../../style/images/ticket2.png';
      const display_name = userInfo.display_name ? userInfo.display_name : userInfo.id;
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
                  <img src={image} alt="" className="header-user-pic-image" />
                </div>
                
                <div className="header-user-dropdown">
                  {userInfo.display_name}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) 
    }
    
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