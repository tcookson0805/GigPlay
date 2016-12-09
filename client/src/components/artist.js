import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


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
    console.log('nextProps', nextProps)
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
  const { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded } = state.auth;
  const { data, concertsList } = state.concerts;
  return { accessToken, refreshToken, user, tracks, totalTracks, trackCalls, artistsArray, artistsObj, tracksLoaded, data, concertsList }
}

export default connect(mapStateToProps)(Artist);



// const Artist = (props) => {
  
//   return (
//     <li className="artist list-group-item">
//       {props.name}
//     </li>
//   )
  
// }

// export default Artist;