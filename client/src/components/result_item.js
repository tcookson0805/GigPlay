import React from 'react';


const ResultItem = (props) => {

  return (
    <div className="result-item row">
    
      <div className="col-md-2">
        <div className="result-item-date">
          {props.date} <br />
          {props.time}
        </div>
      </div>
      
      <div className="col-md-2">
        <div className="result-item-artist">
          {props.artist}
        </div>
      </div>

      <div className="col-md-4">
        {props.event}
      </div>
      
      <div className="col-md-3">
        {props.venue} <br />
        {props.city}, {props.state}
      </div>
      
      <div className="col-md-1">
        <a href={props.url} target="_blank">
          <img src="../../style/images/ticket1.png" height="35em" alt=""/>
        </a>
      </div>
      
    </div>
  )
}

export default ResultItem