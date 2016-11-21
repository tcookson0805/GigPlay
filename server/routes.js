const router = require('express').Router();
var SpotifyWebApi = require('spotify-web-api-node');

const CLIENT_ID = '2e8e732f389f42c7b5fa335619368511';
const CLIENT_SECRET = '1de418828c0b43b98419310e94b482de';
const REDIRECT_URI = 'http://localhost:3000/callback';
const STATE_KEY = 'spotify_auth_state';


const scopes = ['user-read-private', 'user-read-email', 'user-follow-read', 'user-library-read'];

const credentials = {
  clientId : CLIENT_ID,
  clientSecret : CLIENT_SECRET,
  redirectUri : REDIRECT_URI
}

const spotifyApi = new SpotifyWebApi(credentials);

const generateRandomString = (N) => {
  return (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);
}


router.get('/login', (req, res) => {
  const state = generateRandomString(16)
  const authorize = spotifyApi.createAuthorizeURL(scopes, state);
  res.cookie(STATE_KEY, state);
  res.redirect(authorize);
})

router.get('/callback', (req, res) => {
  const { code, state} = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  
  if(state === null || state !== storedState) {
    res.redirect('/#/error/state mismatch');
  } else {
    
    res.clearCookie(STATE_KEY);
    
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
  
})


module.exports = router;