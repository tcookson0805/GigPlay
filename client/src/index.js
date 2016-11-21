import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import reducers from './reducers/index';


// Components
import App from './components/app';

const logger = createLogger();

const rootReducer = combineReducers(reducers)

const Store = createStore(rootReducer, applyMiddleware(thunk, logger));

class Root extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={login}>
            </IndexRoute>
          </Route>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<Root />, document.getElementByClass('container'));