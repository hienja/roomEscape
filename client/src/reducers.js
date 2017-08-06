import { ADD_ITEM, USE_ITEM, CHANGE_SCENE, INVALID } from './actions';

const initialState = {
	dialogue: ['Type two words. Verb then noun.'],
	inventory: {},
	location: 'default'
};

const setInventory = (state, action) => {
	var newState = Object.assign({}, state);
	newState.handleInput.inventory.item = acid;
	return newState;
};

const handleInput = (state = initialState, action) => {
	if (action.type === ADD_ITEM) {
		console.log('adding item');
		return { inventory: { acid: true }, dialogue: ['Invalid'] };
	} else if (action.type === USE_ITEM) {
		console.log('using item');
		return setInventory(state, action);
	} else if (action.type === CHANGE_SCENE) {
		return setInventory(state, action);
	} else if (action.type === INVALID) {
		return setInventory(state, action);
	}
	console.log('returning null from handleInput');
	return state;
};

export default handleInput;
