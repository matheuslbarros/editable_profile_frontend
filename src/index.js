import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import store from './store';

import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={HomePage} />
                <Route path="signin" component={SignInPage} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
