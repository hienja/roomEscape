export const ADD_DIALOGUE = 'ADD_DIALOGUE';
export const CHANGE_SCENE = 'CHANGE_SCENE';

const invalidResponse = 'invalid action';
const needKeyResponse = 'need key';
const validCheckWords = ['check', 'examine', 'inspect', 'scan', 'survey'];
const validGrabWords = ['grab', 'take', 'gather'];
const validUseWords = ['use'];
let itemCheck = {};
let checkForKey = function() {
	if (this.key) {
		return itemCheck[this.key] ? this.name : undefined;
	}
	return this.name;
};
let lab = {
	name: 'lab',
	key: 'lab key',
	checkForKey: checkForKey,
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
	name: 'monster',
	checkForKey: checkForKey,
	forward: null,
	back: 'hallway',
	left: null,
	right: null,
	use: ['acid']
};
let hallway = {
	name: 'hallway',
	checkForKey: checkForKey,
	forward: 'monster',
	back: 'storage',
	left: 'lab',
	right: 'bathroom'
};
let bathroom = {
	name: 'bathroom',
	checkForKey: checkForKey,
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
	name: 'storage',
	checkForKey: checkForKey,
	forward: 'table',
	back: 'hallway',
	left: null,
	right: null
};
let table = {
	name: 'table',
	key: 'storage key',
	checkForKey: checkForKey,
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
	name: 'hole',
	checkForKey: checkForKey,
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
				if (scene[nounInCurrentLocation].checkForKey()) {
					currentLocation = scene[nounInCurrentLocation].name;
					return { type: CHANGE_SCENE, payload: currentLocation };
				} else {
					return { type: ADD_DIALOGUE, payload: needKeyResponse };
				}
			}
		} else if (inputVerb === 'grab') {
			if (verbInCurrentLocation) {
				if (verbInCurrentLocation[inputNoun]) {
					if (itemCheck[verbInCurrentLocation[inputNoun]] === undefined) {
						itemCheck[verbInCurrentLocation[inputNoun]] = true;
						console.log(itemCheck);
						const text = `${inputVerb} ${verbInCurrentLocation[inputNoun]}`;
						return { type: ADD_DIALOGUE, payload: text };
					}
				}
			}
		} else if (inputVerb === 'check') {
			if (verbInCurrentLocation) {
				if (verbInCurrentLocation[inputNoun]) {
					if (itemCheck[verbInCurrentLocation[inputNoun][1]] === undefined) {
						itemCheck[verbInCurrentLocation[inputNoun][1]] = true;
						const text = `grab ${verbInCurrentLocation[inputNoun][0]}`;
						return { type: ADD_DIALOGUE, payload: text };
					}
				}
			}
		} else if (inputVerb === 'use') {
			if (verbInCurrentLocation) {
				if (verbInCurrentLocation.indexOf(inputWords) >= 0) {
					if (itemCheck[inputNoun]) {
						itemCheck[inputNoun] = null;
						const text = `${inputVerb} ${inputNoun}`;
						return { type: ADD_DIALOGUE, payload: text };
					}
				}
			}
		}
	}
	return { type: ADD_DIALOGUE, payload: invalidResponse };
};
