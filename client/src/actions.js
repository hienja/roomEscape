export const ADD_ITEM = 'ADD_ITEM';
export const USE_ITEM = 'USE_ITEM';
export const CHANGE_SCENE = 'CHANGE_SCENE';
export const INVALID = 'INVALID';

// let laboratory, harass;
let itemCheck = {};
let laboratory = {
	forward: null,
	back: 'harass',
	left: null,
	right: null,
	pickup: ['acid']
};
let harass = {
	forward: null,
	back: 'chemistry-laboratory',
	left: null,
	right: null,
	use: ['acid']
};
let scene = {
	'chemistry-laboratory': laboratory,
	harass: harass
};
let currentLocation = 'chemistry-laboratory';

const invalidResponse = 'invalid action';

export const handlingInput = (input, state) => {
	const inputWords = input.split(' ');
	const inputVerb = inputWords[0];
	const inputNoun = inputWords[1];
	const currentLocationVerb = scene[currentLocation][inputVerb];
	const currentLocationNoun = scene[currentLocation][inputNoun];
	if (inputWords) {
		if (inputVerb === 'move') {
			if (currentLocationNoun) {
				currentLocation = currentLocationNoun;
				return { type: CHANGE_SCENE, payload: currentLocation };
			}
		} else if (inputWords.length == 2) {
			if (currentLocationVerb) {
				if (currentLocationVerb.indexOf(inputNoun) >= 0) {
					if (inputVerb === 'pickup') {
						if (itemCheck[inputNoun] === undefined) {
							itemCheck[inputNoun] = true;
							const text = `${inputVerb} ${inputNoun}`;
							return { type: ADD_ITEM, payload: text };
						}
					} else {
						if (itemCheck[inputNoun]) {
							itemCheck[inputNoun] = null;
							const text = `${inputVerb} ${inputNoun}`;
							return { type: USE_ITEM, payload: text };
						}
					}
				}
			}
		}
		return { type: INVALID, payload: invalidResponse };
	}
	console.log('returning null from action');
	return { type: null };
};
