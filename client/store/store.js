import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import throttle from 'lodash/throttle';

import rootReducer from '../reducers/rootReducer';
import { loadState, saveState } from '../utils/saveLocally';

const initialState = loadState();


const store = createStore(rootReducer, initialState,
  compose(applyMiddleware(thunkMiddleware))
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}), 1000);

export default store;
