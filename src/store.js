'use strict';
import {root_reducer} from './reducers';
import reduxThunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
const store = applyMiddleware(reduxThunk)(createStore)(root_reducer);
//import deepFreeze from 'deep-freeze';
//deepFreeze(store);
export default store;