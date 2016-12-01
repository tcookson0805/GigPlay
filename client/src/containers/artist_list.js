import React, { Component } from 'react';

import Artist from '../components/artist';

class ArtistList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  render() {
    return (
      <div className='artist-list col-md-4'>
        <h5>Artists</h5>
        <ul className='list-group'>
          <Artist name='Dave Matthews' />
          <Artist name='Pearl Jam' />
          <Artist name='Metallica' />
          <Artist name='Metallica' />
          <Artist name='Metallica' />
          <Artist name='Metallica' />
          <Artist name='Metallica' />
          <Artist name='Metallica' />
          <Artist name='Metallica' />
          <Artist name='Metallica' />
          <Artist name='Metallica' />
        </ul>
      </div>
    )
  }
  
}

export default ArtistList;