import { combineReducers } from 'redux';
import { ADD_ITEM, USE_ITEM, CHANGE_SCENE } from './actions';

const addItem = (state = {}, action) => {
	if (action.type === ADD_ITEM) {
		return action.payload;
	}
	return state;
};

const useItem = (state = {}, action) => {
	if (action.type === USE_ITEM) {
		return action.payload;
	}
	return state;
};

const changeScene = (state = {}, action) => {
	if (action.type === CHANGE_SCENE) {
		return action.payload;
	}
	return state;
};

const rootReducer = combineReducers({ addItem, useItem, changeScene });

export default rootReducer;
