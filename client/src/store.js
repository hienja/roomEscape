import { createStore } from 'redux';
import handleInput from './reducers';

const store = createStore(handleInput, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
