import React from 'react';

import SearchBox from '../containers/search_box';

const Header = (props) => {
  
  return (
    <div className="header col-md-12">
      <div className="row">
        <div className="col-md-3"></div>
        <SearchBox />
      </div>
    </div>
  )
  
}


export default Header;