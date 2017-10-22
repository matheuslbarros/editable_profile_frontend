import { applyMiddleware, createStore, combineReducers } from 'redux';
import common from './reducers/common';

const reducer = combineReducers({
    common,
});

const loggerMiddleware = store => next => action => {
    console.log('store', store);
    console.log('action', action);
    next(action);
};

const middleware = applyMiddleware(loggerMiddleware);

const store = createStore(reducer, middleware);

export default store;