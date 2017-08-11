export const ADD_ITEM = 'ADD_ITEM';
export const USE_ITEM = 'USE_ITEM';
export const CHANGE_SCENE = 'CHANGE_SCENE';
export const INVALID = 'INVALID';

// let laboratory, harass;
let itemCheck = {};
let lab = {
	forward: null,
	back: 'hallway',
	left: null,
	right: null,
	pickup: ['beaker', 'coat', 'key']
};
let monster = {
	forward: null,
	back: 'hallway',
	left: null,
	right: null,
	use: ['acid']
};
let hallway = {
	forward: 'monster',
	back: 'storage',
	left: 'lab',
	right: 'bathroom',
	use: ['key']
};
let bathroom = {
	forward: null,
	back: 'hallway',
	left: null,
	right: null,
	pickup: ['broken mirror', 'storage key', 'water']
};
let storage = {
	forward: 'table',
	back: 'hallway',
	left: null,
	right: null,
	use: ['storage key']
};
let table = {
	forward: null,
	back: 'storage',
	left: 'hole',
	right: null,
	pickup: ['acid powder'],
	use: ['beaker', 'acid powder', 'water']
};
let hole = {
	forward: null,
	back: 'table',
	left: null,
	right: null,
	pickup: ['lab key']
};
let scene = {
	lab,
	monster,
	hallway,
	bathroom,
	storage,
	table,
	hole
};
let currentLocation = 'hallway';

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
