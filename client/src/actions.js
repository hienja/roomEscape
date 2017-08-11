export const ADD_ITEM = 'ADD_ITEM';
export const USE_ITEM = 'USE_ITEM';
export const CHANGE_SCENE = 'CHANGE_SCENE';
export const INVALID = 'INVALID';

const invalidResponse = 'invalid action';
const validCheckWords = ['check', 'examine', 'inspect', 'scan', 'survey'];
const validGrabWords = ['grab', 'take', 'gather'];
const validUseWords = ['use'];
let itemCheck = {};
let lab = {
	forward: null,
	back: 'hallway',
	left: null,
	right: null,
	check: {
		cabinet: ['beaker', 'beaker'],
		rack: ['coat', 'coat'],
		chair: ['key', ' exit key']
	}
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
	left: ['lab', 'lab key'],
	right: 'bathroom'
};
let bathroom = {
	forward: null,
	back: 'hallway',
	left: null,
	right: null,
	check: {
		toilet: ['key', 'storage key'],
		sink: ['water', 'water']
	},
	grab: {
		mirror: 'broken mirror'
	}
};
let storage = {
	forward: ['table', 'storage key'],
	back: 'hallway',
	left: null,
	right: null
};
let table = {
	forward: null,
	back: 'storage',
	left: 'hole',
	right: null,
	check: {
		table: ['powder', 'acid powder']
	},
	use: ['beaker', 'acid powder', 'water']
};
let hole = {
	forward: null,
	back: 'table',
	left: null,
	right: null,
	check: {
		hole: ['key', 'lab key']
	}
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

export const handlingInput = (input, state) => {
	const inputWords = input.split(' ');
	const inputVerb = inputWords[0];
	const inputNoun = inputWords[1];
	const verbInCurrentLocation = scene[currentLocation][inputVerb];
	const nounInCurrentLocation = scene[currentLocation][inputNoun];
	if (inputWords.length === 2) {
		if (inputVerb === 'move') {
			if (nounInCurrentLocation) {
				if (typeof nounInCurrentLocation === 'object') {
					console.log(itemCheck);
					if (itemCheck[nounInCurrentLocation[1]]) {
						itemCheck[nounInCurrentLocation[1]] = null;
						currentLocation = nounInCurrentLocation[0];
						return { type: CHANGE_SCENE, payload: currentLocation };
					}
				} else {
					currentLocation = nounInCurrentLocation;
					return { type: CHANGE_SCENE, payload: currentLocation };
				}
			}
		} else if (inputVerb === 'grab') {
			if (verbInCurrentLocation) {
				if (verbInCurrentLocation[inputNoun]) {
					if (itemCheck[verbInCurrentLocation[inputNoun]] === undefined) {
						itemCheck[verbInCurrentLocation[inputNoun]] = true;
						console.log(itemCheck);
						const text = `${inputVerb} ${verbInCurrentLocation[inputNoun]}`;
						return { type: ADD_ITEM, payload: text };
					}
				}
			}
		} else if (inputVerb === 'check') {
			if (verbInCurrentLocation) {
				if (verbInCurrentLocation[inputNoun]) {
					if (itemCheck[verbInCurrentLocation[inputNoun][1]] === undefined) {
						itemCheck[verbInCurrentLocation[inputNoun][1]] = true;
						const text = `grab ${verbInCurrentLocation[inputNoun][0]}`;
						return { type: ADD_ITEM, payload: text };
					}
				}
			}
		} else if (inputVerb === 'use') {
			if (verbInCurrentLocation) {
				if (verbInCurrentLocation.indexOf(inputWords) >= 0) {
					if (itemCheck[inputNoun]) {
						itemCheck[inputNoun] = null;
						const text = `${inputVerb} ${inputNoun}`;
						return { type: USE_ITEM, payload: text };
					}
				}
			}
		}
	}
	console.log('returning null from action');
	return { type: INVALID, payload: invalidResponse };
};
