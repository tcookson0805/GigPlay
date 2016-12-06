import React from 'react';

import SearchBox from '../containers/search_box';

const Header = (props) => {
  
  console.log('HEADER - props', props);
  
  return (
    <div className="header col-md-12">
      <div className="row">
        Concert Spots
      </div>
    </div>
  )
  
}


export default Header;