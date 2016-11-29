import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { bindActionCreators } from 'redux';

import { getMyTracks } from '../actions/actions'; 

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {

  }

  render() {
    return (
      <h1>This is the Main Page</h1>
    )
  } 

}

function mapStateToProps(state) {
  const { accessToken, refreshToken, user, tracks } = state.auth
  return { accessToken, refreshToken, user, tracks }
}  

export default connect(mapStateToProps)(Main);