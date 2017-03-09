import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getConcertsFirebase, updateConcertsDisplayList, resetConcertsDisplayList, addToFilteredFirebase } from '../actions/firebase-actions';

const _ = require('underscore');

const noStyle = {
  'backgroundColor': 'white',
  'color': 'black',
  'cursor': 'default'
}

class Artist extends Component {
  
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount(){
    
    const name = this.props.name;
    const concerts = this.props.concerts;
    const displayList = this.props.concertsDisplayList || this.concertsDisplayListFirebase
    
    this.setState({
      name: name,
      style: noStyle
    })
  }
  
  render() {

    const { name, concerts } = this.props;

    return (
      <li className="artist list-group-item" style={this.state.style}>
        {name} (0)
      </li>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.auth
  const { concertsDisplayList } = state.concerts
  const { concertsDisplayListFirebase, userInfoFirebase } = state.firebase
  return { concertsDisplayList, concertsDisplayListFirebase, user, userInfoFirebase }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getConcertsFirebase, updateConcertsDisplayList, resetConcertsDisplayList, addToFilteredFirebase }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist);