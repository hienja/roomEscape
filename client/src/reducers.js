import { combineReducers } from 'redux';
import { HANDLE_INVENTORY, CHANGE_SCENE } from './actions';

const initializeInventory = {
	inventory: []
};
const initializeLocation = {
	location: 'default'
};

const handleInventory = (state = initializeInventory, action) => {
	if (action.type === HANDLE_INVENTORY) {
		return action.payload;
	}
	return state;
};

const changeScene = (state = initializeLocation, action) => {
	if (action.type === CHANGE_SCENE) {
		return action.payload;
	}
	return state;
};

const rootReducer = combineReducers({ handleInventory, changeScene });

export default rootReducer;
