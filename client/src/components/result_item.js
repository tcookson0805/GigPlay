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

        // <div className="col-md-2 col-sm-6 result-item-ticket">
        //     <ResultItemTicket url={props.url} />
        // </div>

  return (

    <div className="result-item">
      <a href={props.url} target="_blank">
      <div className="row">
      
        <div className="col-md-3 col-sm-6 result-item-date">
            {date}
        </div>
        
        <div className="col-md-4 col-sm-6 result-item-artist">
            {props.artist} 
        </div>
        
        <div className="col-md-5 col-sm-6 result-item-location">
          <div className="row result-item-venue">
            <div className="col-md-12">
              {props.venue}
            </div>
          </div>
          <div className="row result-item-city">
            <div className="col-md-12">
              {location}
            </div>
          </div>
        </div>

      </div>
      </a>

    
    </div>
  )
}

export default ResultItem