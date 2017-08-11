import { ADD_ITEM, USE_ITEM, CHANGE_SCENE, INVALID } from './actions';

const initialState = {
	dialogue: ['Type two words. Verb then noun.'],
	location: 'hallway'
};

const setInventory = (state, payload) => {
	var newState = Object.assign({}, state);
	newState.dialogue.push(payload);
	return newState;
};
const setScene = (state, payload) => {
	var newState = Object.assign({}, state, { location: payload });
	return newState;
};
const handleInput = (state = initialState, action) => {
	if (action.type === ADD_ITEM) {
		console.log('adding item');
		return setInventory(state, action.payload);
	} else if (action.type === USE_ITEM) {
		console.log('using item');
		return setInventory(state, action.payload);
	} else if (action.type === CHANGE_SCENE) {
		return setScene(state, action.payload);
	} else if (action.type === INVALID) {
		return setInventory(state, action.payload);
	}
	console.log('returning null from handleInput');
	return state;
};

export default handleInput;
