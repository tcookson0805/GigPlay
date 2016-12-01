import React, { Component } from 'react';

import ResultItem from '../components/result_item.js'

class ResultsBox extends Component {
  
  constructor(props) {
    super(props);
    this.state={}
  }
  
  render() {
    
    return (
      <div className="results-box col-md-12">
        <div className="row">
          <div className="results-box-header col-md-12">
            Results
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ResultItem />
            <ResultItem />
            <ResultItem />
          </div>
        </div>
      </div>
    )
  }  
}



export default ResultsBox;