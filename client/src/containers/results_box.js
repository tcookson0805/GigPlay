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
    // console.log('RESULT BOX ------ this.props', this.props)
    
    const { concertsDisplayList, concertsDisplayListFirebase } = this.props
    
    // console.log('concertsDisplayList', concertsDisplayList);
    // console.log('concertsDisplayListFirebase', concertsDisplayListFirebase);
    let list = concertsDisplayListFirebase || concertsDisplayList
    let displayList;
     
    if(!list){
      return <div>loading....</div>
    }
    
    if(list.filteredList && list.filteredList.length){
      displayList = list.filteredList
    } else {
      displayList = list.totalList
    }
  
  
    // if(!list){
    //   return (
    //     <div className="results-box col-md-12">
    //       <div className="results-box-header">
    //         <h2>SHOWS FROM YOUR FAVORITE ARTISTS</h2>
    //       </div>
    //       <div className="results-group">
            
    //         <div className="loading">
    //           Loading 
    //         </div>
            
    //         <div className="loader">
    //           <Loading type="bars" color="e3e3e3" height={10} width={10} color={`#1ED760`} />
    //         </div>
          
    //       </div>
    //     </div>
    //     )
    // }

    

    return (
      <div className="results-box col-md-12">
        <div className="results-box-header">
          <h2>SHOWS FROM YOUR FAVORITE ARTISTS</h2>
        </div>
        <div className="results-group">
          { 
            displayList.map(function(concert, index) {
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
  
  if(concertsDisplayListFirebase && !concertsDisplayListFirebase.filteredList) {
    concertsDisplayListFirebase['filteredList'] = [];
    concertsDisplayListFirebase['filteredObj'] = {};
  }
  
  return { concertsDisplayList, concertsDisplayListFirebase }
}

export default connect(mapStateToProps)(ResultsBox);