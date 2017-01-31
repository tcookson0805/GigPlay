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
          <div className="col-md-4 offset-md-4">
            <div className="login-hero">
              <div className="login-hero-info">
                <img class="login-hero-logo" src="../../style/images/Gigplay-logo-1x.png" alt="Gigplay Logo"/>
                <p className="login-hero-info-text1">
                  Find concerts in your area <br />
                  based on the songs you <br />
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