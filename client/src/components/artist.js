import React from 'react';

const Artist = (props) => {
  
  return (
    <li className="artist list-group-item">
      {props.name}
    </li>
  )
  
}

export default Artist;