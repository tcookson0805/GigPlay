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

const noStyle = {
  'backgroundColor': 'white',
  'color': 'black',
  'cursor': 'default'
}

class Artist extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      style: null,
      concertNumber: 0,
      allArtistsComponent: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.setArtistComponent = this.setArtistComponent.bind(this);

  }
  
  setArtistComponent(nextProps, artistName){
    if(nextProps.concertsDisplayListFirebase){
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
  }
  
  handleClick(){ 
    console.log('clicked!!')
    const { user, userInfoFirebase } = this.props;
    const userInfo = userInfoFirebase;
    const endpoint = 'users/' + userInfo.id
    console.log('endpoint', endpoint)
    
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
    const { concertsDisplayList, concertsDisplayListFirebase, name } = this.props;
    const list = concertsDisplayListFirebase;
    const concertNumber = list.totalObj[name] ? list.totalObj[name].length : list.totalList.length;

    if(this.props.name === 'ALL ARTISTS'){
      this.setState({
        'allArtistsComponent': true,
        'style': selectedStyle,
        'concertNumber': list.totalList.length
      })
    } else {
      if(!concertNumber){
        this.setState({
          'style': noStyle,
          'concertNumber': 0
        })
      } else {
        this.setState({
          'style': unSelectedStyle,
          'concertNumber': concertNumber
        })
      }
    }
  
  }
  
  componentWillReceiveProps(nextProps){
    console.log('ARTIST ------ nextProps', nextProps)  
    this.setArtistComponent(nextProps, this.props.name);
  }

  
  render() {    
    const { concertsDisplayList, concertsDisplayListFirebase, name } = this.props;
    // const list = concertsDisplayList.totalList.length ? concertsDisplayList : concertsDisplayListFirebase;
    const list = concertsDisplayListFirebase;
    console.log('LIST', list);
    console.log('name', name);
    let concertNumber;
    
    if(name === 'ALL ARTISTS'){
      console.log('RIGHT IN HERE FUCKER')
      console.log(list.totalList.length)
      concertNumber = list.totalList.length;
    } else {
      if(list.totalObj[name]){
        concertNumber = list.totalObj[name].length;
      } else {
        concertNumber = 0;
      }
    }
    
    const x = <li>Hello</li>
    
    if(!this.state.style){
      return <li></li>
    }
    
    return (
      <li className="artist list-group-item" style={this.state.style} onClick={this.handleClick}>
        {name} ({concertNumber})
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