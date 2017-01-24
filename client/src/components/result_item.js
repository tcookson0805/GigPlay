import React from 'react';
import ResultItemTicket from './result_item_ticket'

const ResultItem = (props) => {

  var yy = props.date.slice(0,4);
  var mm = props.date.slice(5,7);
  var dd = props.date.slice(8,10);

  var months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'March',
    '04': 'Apr',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'Aug',
    '09': 'Sept',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
  }

  var date = months[mm] + ' ' + dd + ', ' + yy;

  if(props.state){
    var location = props.city + ', ' + props.state;
  } else {
    var location = props.city
  }


  console.log('date', date);


  return (
    <div className="result-item">
      
      <div className="row">
    
        <div className="col-md-2">
          <div className="result-item-date">
            {date}
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="result-item-artist">
            {props.artist} 
          </div>
        </div>
        
        <div className="col-md-5">
          <div className="result-item-location">
            <div className="result-item-venue">
              {props.venue}
            </div>
            <div className="result-item-city">
              {location}
            </div>
          </div>
        </div>
        
        <div className="col-md-2">
          <div className="result-item-ticket">
            <ResultItemTicket url={props.url} />
          </div>
        </div>
      
      </div>

    </div>
  )
}

export default ResultItem