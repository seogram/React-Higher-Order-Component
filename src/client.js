import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from 'react-dom';
import logger from 'redux-logger';
import moreless from './components/pages/HOC-More-Less';
import filter from './components/pages/HOC-Instant-Search';
import spinner from './components/pages/HOC-Spinner';
import sort from './components/pages/HOC-sort';
import scroll from './components/pages/HOC-Infinite-scroll';
import Main from './main';
import NotFound from './components/pages/NotFound';

const middleWare = applyMiddleware(logger, thunk);
const store = createStore(reducers, middleWare);

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={moreless} />
        <Route path="filter" component={filter}/>
        <Route path="spinner" component={spinner}/>
        <Route path="sort" component={sort}/>
        <Route path="scroll" component={scroll}/>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
)
ReactDOM.render(
  Routes, document.getElementById('root')
);

