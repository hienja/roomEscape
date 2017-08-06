export const ADD_ITEM = 'ADD_ITEM';
export const USE_ITEM = 'USE_ITEM';
export const CHANGE_SCENE = 'CHANGE_SCENE';
export const INVALID = 'INVALID';

const itemCheck = {
	acid: {
		use: true,
		pickup: true
	}
};
const invalidResponse = 'Invalid action.';

export const handlingInventory = input => {
	var input = input.split(' ');
	if (input) {
		if (input.length == 2) {
			const text = input[0] + ' ' + input[1];
			const wrapper = {
				item: input[1],
				text: text
			};
			if (itemCheck[input[1]]) {
				return { type: ADD_ITEM, payload: wrapper };
			} else if (itemCheck[input[1]]) {
				return { type: USE_ITEM, payload: wrapper };
			}
		}
	}
	console.log('returning null from action');
	return { type: null };
};

export const changingScene = scene => {
	return { type: CHANGE_SCENE, payload: scene };
};
