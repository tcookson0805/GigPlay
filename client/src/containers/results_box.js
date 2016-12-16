import React, { Component } from 'react';
import { connect }      from 'react-redux';
import { bindActionCreators } from 'redux';
import base from '../../../config/firebase';

import ResultItem from '../components/result_item.js'

class ResultsBox extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }
   
  render() {
    console.log('RESULT BOX ------ this.props', this.props)
    
    const { concertsDisplayList } = this.props
    
    console.log('concertsDisplayList', concertsDisplayList);
    console.log('this.concertsDisplayList', concertsDisplayList);
    let list;
     
    if(!concertsDisplayList){
      return <div>loading....</div>
    }
    
    if(concertsDisplayList.filteredList && concertsDisplayList.filteredList.length){
      list = concertsDisplayList.filteredList
    } else {
      list = concertsDisplayList.totalList
    }
    

    return (
      <div className="results-box col-md-12">
        <div className="results-box-header">
          <h2>SHOWS FROM YOUR FAVORITE ARTISTS</h2>
        </div>
        <div className="results-group">
          { 
            list.map(function(concert, index) {
              if(concert.display){
                return (
                  <ResultItem 
                    artist={concert.artist} 
                    date={concert.date} 
                    city={concert.city} 
                    state={concert.state} 
                    time={concert.time} 
                    venue={concert.venue}
                    url={concert.url}
                    event={concert.event}
                    key={index} 
                  />
                )
              }              
            })
          }
        </div>
      </div>
    )
  }  
}

function mapStateToProps(state) {
  let { concertsDisplayList, filteredConcertsDisplayList} = state.concerts;
  let { concertsDisplayListFirebase } = state.firebase;
  
  if(!concertsDisplayList){
    concertsDisplayList = concertsDisplayListFirebase;
  }
  
  return { concertsDisplayList }
}

export default connect(mapStateToProps)(ResultsBox);