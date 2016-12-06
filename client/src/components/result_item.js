import React from 'react';


const ResultItem = (props) => {
  
  return (
    <div className="result-item row">
      <div className="col-md-3">
        <div className="result-item-date">
          {props.date} <br />
          {props.time}
        </div>
      </div>
      
      <div className="col-md-9">
        <div className="row">
          <div className="result-item-info">
            <div className="col-md-4">
              <strong>{props.artist}</strong>
            </div>
            <div className="col-md-4">
              {props.venue}
            </div>
            <div className="col-md-4">
              {props.city}, {props.state} 
            </div>
          </div>
        
        </div>
      </div>
      
    </div>
  )
  
}

export default ResultItem