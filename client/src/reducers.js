import { ADD_DIALOGUE, CHANGE_SCENE } from './actions';

const initialState = {
	dialogue: ['type two words', 'e.g. move forward'],
	location: 'hallway'
};

const setDialogue = (state, payload) => {
	var newState = Object.assign({}, state);
	newState.dialogue.push(payload);
	return newState;
};
const setScene = (state, payload) => {
	var newState = Object.assign({}, state, { location: payload });
	return newState;
};
const handleInput = (state = initialState, action) => {
	if (action.type === ADD_DIALOGUE) {
		return setDialogue(state, action.payload);
	} else if (action.type === CHANGE_SCENE) {
		return setScene(state, action.payload);
	}
	return state;
};

export default handleInput;
