'use strict';

const router = require('express').Router();
var SpotifyWebApi = require('spotify-web-api-node');

// var SPOTIFY_CONFIG_CLIENT_ID = require('../config/spotify').SPOTIFY_CLIENT_ID
// var SPOTIFY_CONFIG_CLIENT_SECRET = require('../config/spotify').SPOTIFY_CLIENT_SECRET
// var SPOTIFY_CONFIG_REDIRECT_URI = require('../config/spotify').SPOTIFY_REDIRECT_URI
// var SPOTIFY_CONFIG_STATE_KEY = require('../config/spotify').SPOTIFY_STATE_KEY

const scopes = ['user-read-private', 'user-read-email', 'user-follow-read', 'user-library-read'];

// const ID  = process.env.SPOTIFY_CLIENT_ID || SPOTIFY_CONFIG_CLIENT_ID;
// const SECRET = process.env.SPOTIFY_CLIENT_SECRET || SPOTIFY_CONFIG_CLIENT_SECRET;
// const URI = process.env.SPOTIFY_REDIRECT_URI || SPOTIFY_CONFIG_REDIRECT_URI
// const KEY = process.env.SPOTIFY_STATE_KEY || SPOTIFY_CONFIG_STATE_KEY;


const credentials = {
  clientId : process.env.SPOTIFY_CLIENT_ID,
  clientSecret : process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri : process.env.SPOTIFY_REDIRECT_URI
}

const spotifyApi = new SpotifyWebApi(credentials);

const generateRandomString = (N) => {
  return (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);
}


router.get('/login', (req, res) => {
  const state = generateRandomString(16)
  const authorize = spotifyApi.createAuthorizeURL(scopes, state);
  res.cookie(KEY, state);
  res.redirect(authorize);
})

router.get('/callback', (req, res) => {
  const { code, state} = req.query;
  const storedState = req.cookies ? req.cookies[KEY] : null;
  
  if(state === null || state !== storedState) {
    res.redirect('/#/error/state mismatch');
  } else {
    
    res.clearCookie(KEY);
    
    spotifyApi.authorizationCodeGrant(code)
      .then( (data) => {
        const { expires_in, access_token, refresh_token } = data.body;
        
        console.log('expires_in', expires_in);
        console.log('======================');

        
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
        
        // use the access token to access the Spotify Web API
        spotifyApi.getMe().then(({ body }) => {
          console.log(body);
        });

        
        res.redirect(`/#/user/${access_token}/${refresh_token}`);
      }).catch( (err) => {
        res.redirect('/#/error/invalid token');
      });
      
  }
  
});



module.exports = router;