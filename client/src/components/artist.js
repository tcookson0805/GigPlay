import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getConcertsFirebase, updateConcertsDisplayList, resetConcertsDisplayList, addToFilteredFirebase } from '../actions/firebase-actions';

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
    this.state={
      selected: false,
      style: {
        'backgroundColor': 'white',
        'color': 'black',
        'cursor': 'default'
      },
      concertNumber: 0,
      allArtistsComponent: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.setArtistComponent = this.setArtistComponent.bind(this);
  }
  
  setArtistComponent(nextProps, artistName){
    const filteredList = nextProps.concertsDisplayListFirebase.filteredList || [];
    if(filteredList.length){
      if(this.state.allArtistsComponent){
        this.setState({
          'style': unSelectedStyle,
          'selected': false,
          'concertNumber': nextProps.concertsDisplayListFirebase.totalList.length
        })
      }
      if(nextProps.concertsDisplayListFirebase.filteredObj && nextProps.concertsDisplayListFirebase.filteredObj[artistName]){
        this.setState({
          'style': selectedStyle,
          'selected': true,
          'concertNumber': nextProps.concertsDisplayListFirebase.totalObj[artistName].length
        })
      }
    }else{
      if(this.state.allArtistsComponent){
        this.setState({
          'style': selectedStyle,
          'selected': true,
          'concertNumber': nextProps.concertsDisplayListFirebase.totalList.length
        })
      }
      if(nextProps.concertsDisplayListFirebase.totalObj[artistName]){
        this.setState({
          'style': unSelectedStyle,
          'selected': false,
          'concertNumber': nextProps.concertsDisplayListFirebase.totalObj[artistName].length
        })
      }
    }
  }
  
  handleClick(){ 
    console.log('hey')
    const endpoint = 'users/' + this.props.user.id
    
    if(this.props.name === 'ALL ARTISTS'){
      this.props.resetConcertsDisplayList(endpoint, this)
    } else {
      if(this.state.concertNumber === 0){
        return
      }else{
        this.setState({
          selected: !this.state.selected,
        })
        this.props.updateConcertsDisplayList(endpoint, this, this.props.name, this.state.selected)      
      }
    }
  }
  
  componentWillMount(){
    if(this.props.name === 'ALL ARTISTS'){
      this.setState({
        'allArtistsComponent': true,
        'style': selectedStyle,
      })
    }
  }
  
  componentWillReceiveProps(nextProps){  
    this.setArtistComponent(nextProps, this.props.name);
  }

  
  render() {
    
    const { concertsDisplayList, concertsDisplayListFirebase } = this.props;
    const x = <li>Hello</li>
    
    return (
      <li className="artist list-group-item" style={this.state.style} onClick={this.handleClick}>
        {this.props.name} ({this.state.concertNumber})
      </li>
    )
    
  }
}


function mapStateToProps(state) {
  const { concertsDisplayList } = state.concerts
  const { concertsDisplayListFirebase, userInfoFirebase } = state.firebase
  const user = userInfoFirebase;
  return { concertsDisplayList, concertsDisplayListFirebase, user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getConcertsFirebase, updateConcertsDisplayList, resetConcertsDisplayList, addToFilteredFirebase }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist);