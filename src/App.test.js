import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import App from './App';
import store from './store';

global.localStorage = {
  data: {},
  setItem: function (key, value) {
    this.data[key] = value;
  },
  getItem: function (key) {
    return this.data[key];
  },
  removeItem: function (key) {
    delete this.data[key];
  }
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App} />
      </Router>
    </Provider>, div);
});
