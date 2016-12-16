import React, { Component } from 'react';


const ResultItemTicket = (props) => {
  console.log('props', props)
  
  return (
    <div className="result-item row">
      <div className="result-item-ticket">
        <a href={props.url} target="_blank">
          <img src="../../style/images/ticket1.png" height="35em" alt=""/>
        </a>
      </div>
    </div>
  )
  // return (
  //   <div className="result-item row">
  //     <div className="result-item-ticket-cover">
  //       Click
  //     </div>
  //     <div className="result-item-ticket">
  //       <a href={props.url} target="_blank">
  //         <img src="../../style/images/ticket1.png" height="35em" alt=""/>
  //       </a>
  //     </div>
  //   </div>
  // )
}

export default ResultItemTicket