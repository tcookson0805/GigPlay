import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './header';
import MapBox from '../containers/map_box';
import ResultsBox from '../containers/results_box';
import ArtistList from '../containers/artist_list';


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    
    // return (
    //   <div>
    //     <div className="row">
    //       <Header />
    //     </div>
    //     <div className='row hero'>
    //       <div className="col-md-3">
    //         <ArtistList />
    //       </div>
    //       <div className="col-md-1"></div>
          
    //       <div className="col-md-7">
    //         <div className="row">
    //           <MapBox />
    //           <ResultsBox />
    //         </div>
    //       </div>

    //     </div>
    //   </div>
    // )
    
  return (
      <div>
        <div className="row">
          <Header />
        </div>
        <div className='row hero'>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <ResultsBox />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <MapBox />            
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <ArtistList />             
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    
  } 
  
}

function mapStateToProps(state) {
  const { accessToken, refreshToken, user, tracks } = state.auth
  return { accessToken, refreshToken, user, tracks }
}  

export default connect(mapStateToProps)(Main);