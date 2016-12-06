import React, { Component } from 'react';
// require("css!../../style/style.css");


/**
 * Main app component
 * Has a header and then render's the page content
 */
export default class SpotifyLogin extends Component {
  render() {
    // injected via react router
    const {children} = this.props;

    return (
      <div className="container-fluid">
        <div className="spotify-login">
          <div className="page-content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}