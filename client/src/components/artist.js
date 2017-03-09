import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  getConcertsFirebase, 
  updateConcertsDisplayList, 
  resetConcertsDisplayList, 
  addToFilteredFirebase, 
  removeFromFilteredFirebase } from '../actions/firebase-actions';

const _ = require('underscore');

const selectedStyle = {
  'backgroundColor': 'black',
  'color': 'white'
}
const unSelectedStyle = {
  'backgroundColor': '#545A60',
  'color': 'white'
}

class Artist extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      allArtistComponent: false,
      name: null,
      concerts: null,
      selected: false
    }
  }

  componentWillMount(){
    
    const name = this.props.name;
    const concerts = this.props.concerts;
    const displayList = this.props.concertsDisplayListFirebase || this.props.concertsDisplayList
    
    this.setState({
      name: name,
      concerts: concerts,
      style: unSelectedStyle
    });

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(){

    const { name, user, userInfoFirebase } = this.props;
    const id = userInfoFirebase ? userInfoFirebase.id : user.id;
    const endpoint = 'users/' + id;
    const selected = this.state.selected
  
    if(selected){
      this.setState({
        selected: false,
        style: unSelectedStyle
      })
      this.props.removeFromFilteredFirebase(endpoint, this, name)
    } else {
      this.setState({
        selected: true,
        style: selectedStyle
      })
      this.props.addToFilteredFirebase(endpoint, this, name);
    }

  }

  componentDidMount() {}
  
  componentWillReceiveProps(nextProps){

    const { name } = this.props;
    
    if(nextProps.concertsDisplayListFirebase){
      if(nextProps.concertsDisplayListFirebase.filteredObj[name]) {
        this.setState({
          selected: true,
          style: selectedStyle
        })
      } else {
        this.setState({
          selected: false,
          style: unSelectedStyle
        })
      }
    }  
  }
  
  render() {

    const { name, concerts } = this.props;

    return (
      <li className="artist list-group-item" style={this.state.style} onClick={this.handleClick}>
        {name} ({concerts.length})
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
  return bindActionCreators({ getConcertsFirebase, updateConcertsDisplayList, resetConcertsDisplayList, addToFilteredFirebase, removeFromFilteredFirebase }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist);