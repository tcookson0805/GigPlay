import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore, routeReducer }     from 'react-router-redux';
import { createHistory } from 'history';

import rootReducer from './reducers/index';


// Components
import App from './components/app';
import Login from './components/login';
import User from './components/user';
import Error from './components/error';
import Main from './components/main';

// Sync dispatched route actions to the history

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, middleware)
const history = syncHistoryWithStore(hashHistory, store)


class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Login} />
            <Route path="/user/:accessToken/:refreshToken" component={User} />
            <Route path="/error/:errorMsg" component={Error} />
            <Route path="/main" component={Main} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));