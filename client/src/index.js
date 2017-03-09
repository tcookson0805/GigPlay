import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore, routeReducer }     from 'react-router-redux';
import { createHistory } from 'history';
import {persistStore, autoRehydrate} from 'redux-persist';

import rootReducer from './reducers/index';

// Components
import App from './components/app';
import Login from './components/login';
import User from './components/user';
import Main from './components/main';
import Error from './components/error';

// Sync dispatched route actions to the history
const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware);
const history = syncHistoryWithStore(hashHistory, store);

// importing CSS file
import '../style/main.css';

class Root extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Login} />
            <Route path="/user/:accessToken/:refreshToken" component={User} />
            <Route path="/main/:userId" component={Main} />
            <Route path="/error/:errorMsg" component={Error} />
          </Route>
        </Router>
      </Provider>
    );
  }
  
}

ReactDOM.render(<Root />, document.getElementById('root'));