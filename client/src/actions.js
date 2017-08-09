export const ADD_ITEM = 'ADD_ITEM';
export const USE_ITEM = 'USE_ITEM';
export const CHANGE_SCENE = 'CHANGE_SCENE';
export const INVALID = 'INVALID';

let itemCheck = {
	acid: {
		have: false,
		pickupWords: ['pickup'],
		useWords: ['use']
	}
};
let location = 'chemistry-laboratory';

const invalidResponse = 'invalid action';

export const handlingInput = (input, state) => {
	var input = input.split(' ');
	if (input) {
		if (input[0] === 'move') {
			location = location === 'chemistry-laboratory' ? 'harass' : 'chemistry-laboratory';
			return { type: CHANGE_SCENE, payload: location };
		} else if (input.length == 2) {
			if (itemCheck[input[1]]) {
				if (itemCheck[input[1]].have === false) {
					if (itemCheck[input[1]].pickupWords.indexOf(input[0]) >= 0) {
						itemCheck[input[1]].have = true;
						const text = input[0] + ' ' + input[1];
						return { type: ADD_ITEM, payload: text };
					}
				} else {
					if (itemCheck[input[1]].useWords.indexOf(input[0]) >= 0) {
						itemCheck[input[1]].have = undefined;
						const text = input[0] + ' ' + input[1];
						return { type: USE_ITEM, payload: text };
					}
				}
			}
		}
		return { type: INVALID, payload: invalidResponse };
	}
	console.log('returning null from action');
	return { type: null };
};

export const changingScene = scene => {
	return { type: CHANGE_SCENE, payload: scene };
};
