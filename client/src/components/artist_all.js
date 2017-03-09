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

class ArtistAll extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      allArtistComponent: false,
      name: null,
      concerts: null,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

    const { name, user, userInfoFirebase } = this.props;
    const id = userInfoFirebase ? userInfoFirebase.id : user.id;
    const endpoint = 'users/' + id;

    this.setState({
      selected: true,
      style: selectedStyle
    })    

    this.props.resetConcertsDisplayList(endpoint, this); 
  }

  componentWillMount(){
    
    const name = this.props.name;
    const concerts = this.props.concerts;
    const displayList = this.props.concertsDisplayList || this.concertsDisplayListFirebase
    
    this.setState({
      name: name,
      concerts: concerts,
      style: selectedStyle,
      selected: true
    })
  }
  
  componentDidMount() {}
  
  componentWillReceiveProps(nextProps){
    
    if(nextProps.concertsDisplayListFirebase){
      if(nextProps.concertsDisplayListFirebase.filteredList.length){
        this.setState({
          selected: false,
          style: unSelectedStyle
        })
      } else {
        this.setState({
          selected: true,
          style: selectedStyle
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
  return bindActionCreators({ getConcertsFirebase, updateConcertsDisplayList, resetConcertsDisplayList, addToFilteredFirebase }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistAll);