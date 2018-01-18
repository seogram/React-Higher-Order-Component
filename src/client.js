
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reducers from './reducers/index';
import { render } from 'react-dom';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import dashboard from './components/pages/dashboard';
import Main from './main';
import NotFound from './components/pages/NotFound';

const middleWare = applyMiddleware(logger, thunk);
const store = createStore(reducers, middleWare);

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={dashboard} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
)
ReactDOM.render(
  Routes, document.getElementById('root')
);

