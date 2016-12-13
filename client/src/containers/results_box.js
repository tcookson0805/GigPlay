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
    
    let list;
     
    if(!this.props.concertsDisplayList){
      return <div>loading....</div>
    }
    
    if(this.props.concertsDisplayList.filteredList && this.props.concertsDisplayList.filteredList.length){
      list = this.props.concertsDisplayList.filteredList
    } else {
      list = this.props.concertsDisplayList.totalList
    }
    

    return (
      <div className="results-box col-md-12">
        <div className="row">
          <div className="results-box-header col-md-12">
            Results
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 results-group">
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
      </div>
    )
  }  
}

function mapStateToProps(state) {
  const { concertsDisplayList, filteredConcertsDisplayList} = state.concerts;
  return { concertsDisplayList, filteredConcertsDisplayList }
}

export default connect(mapStateToProps)(ResultsBox);