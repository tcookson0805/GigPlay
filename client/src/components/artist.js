import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateConcertsDisplayList } from '../actions/firebase-actions';

class Artist extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      selected: false,
      style: {
        'backgroundColor': 'white'
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('ARTIST nextProps', nextProps)
  }
  
  handleClick(){

    if(!this.state.selected){
      this.setState({
        selected: true,
        style: {
          'backgroundColor': 'red'
        }
      }) 
    } else {      
      this.setState({
        selected: false,
        style: {
          'backgroundColor': 'white'
        }
      })
    }
    this.props.updateConcertsDisplayList('users/tcookson0805', this, this.props.name, this.state.selected);
  }
  
  render() {
  
    return (
      <li className="artist list-group-item" style={this.state.style} onClick={this.handleClick}>
        {this.props.name}
      </li>
    )
  }
}


function mapStateToProps(state) {
  const { concertsDisplayList } = state.concerts
  return { concertsDisplayList}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateConcertsDisplayList }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Artist);