import React, { Component } from 'react';
import loginSVG from '../log_in.svg';
import BackgroundVideo from 'react-background-video';

/**
 * Our login page
 * Has a login button that hit's the login url
 */
export default class Login extends Component {
  
  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
  }
  
  componentDidMount(){  
  }
  
  render() {
    
    const videos = [{
      src:'../../style/videos/Cheer-Up/MP4/Cheer-Up.mp4',
      type:"video/mp4"
    }]

    
    return (
      <div className="login">
      
        <div className="login-background">
          <div className="login-video">
            <video src="../../style/videos/Cheer-Up/MP4/Cheer-Up.mp4" autoPlay loop></video>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
          </div>
          <div className="col-md-4">
            <div className="jumbotron login-hero">
              <div className="login-hero-info">
                <img src="../../style/images/Gigplay-logo-1x.png" alt="Gigplay Logo"/>
                <p className="login-hero-info-text1">Find concerts in your area <br />based on the songs you <br />listen to most.</p>
                <p>And support artists you love</p>
                <span className="login-hero-info-link">
                  <a href="/login" dangerouslySetInnerHTML={{__html: loginSVG}}></a>                
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
    
  
  }
}