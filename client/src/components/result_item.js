import React from 'react';
import ResultItemTicket from './result_item_ticket'

const ResultItem = (props) => {

  return (
    <div className="result-item row">
    
      <div className="col-md-2">
        <div className="result-item-date">
          {props.date}
        </div>
      </div>
      
      <div className="col-md-4">
        <div className="result-item-artist">
          {props.artist} 
        </div>
      </div>
      
      <div className="col-md-4">
        {props.venue} <br />
        {props.city}, {props.state}
      </div>
      
      <div className="col-md-2">
        <ResultItemTicket url={props.url} />
      </div>
      
    </div>
  )
}

export default ResultItem