import React, { Component } from 'react';
import loginSVG from '../log_in.svg';
import BackgroundVideo from 'react-background-video';

export default class Login extends Component {
  
  constructor(props) {
    super(props);
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
          <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
            <div className="login-hero">
              <div className="login-hero-info">
                <img src="../../style/images/Gigplay-logo-1x.png" alt="Gigplay Logo"/>
                <p className="login-hero-info-text1">
                  Find concerts in your area 
                  based on the songs you
                  listen to most.</p>
                <p className="login-hero-info-text2">
                  And support artists you love
                </p>
                <div className="login-hero-info-link">
                  <a href="/login" dangerouslySetInnerHTML={{__html: loginSVG}}></a>                
                </div>
                <div className="login-hero-demo">
                  If you want to demo this app, login with the following credentials:
                  <div>
                    Username: gigplaydemo
                  </div>
                  <div>
                    Password: gigplay
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
  }
}