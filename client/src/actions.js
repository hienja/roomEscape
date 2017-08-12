export const ADD_DIALOGUE = 'ADD_DIALOGUE';
export const CHANGE_SCENE = 'CHANGE_SCENE';

const invalidResponse = 'invalid action';
const needKeyResponse = 'need key';
const validCheckWords = ['check', 'examine', 'inspect', 'scan', 'search'];
const validGrabWords = ['grab', 'take', 'gather'];
const validUseWords = ['use'];
let inventory = {};
const checkForKey = function() {
	if (this.key) {
		return inventory[this.key] ? this.name : undefined;
	}
	return this.name;
};
const checkForRestrictionItem = function(action, item) {
	if (this[action][item].restrictionItem) {
		return inventory[this[action][item].restrictionItem] ? item : undefined;
	}
	return item;
};
const reduceWord = input => {
	if (validCheckWords.indexOf(input) >= 0) {
		return validCheckWords[0];
	} else if (validGrabWords.indexOf(input) >= 0) {
		return validGrabWords[0];
	} else if (validUseWords.indexOf(input) >= 0) {
		return validUseWords[0];
	} else {
		return input;
	}
};
const lab = {
	name: 'lab',
	key: 'lab key',
	checkForKey: checkForKey,
	forward: null,
	back: 'hallway',
	left: null,
	right: null,
	checkForRestrictionItem: checkForRestrictionItem,
	check: {
		cabinet: { name: 'beaker', itemName: 'beaker' },
		rack: { name: 'coat', itemName: 'coat' },
		chair: { name: 'key', itemName: 'exit key' }
	},
	use: {
		powder: {
			text: 'mixed powder into beaker. got acid.',
			itemName: 'acid powder',
			restrictionItem: 'beaker water'
		},
		coat: { text: 'looking nice with that coat', itemName: 'coat' }
	}
};
const monster = {
	name: 'monster',
	checkForKey: checkForKey,
	forward: null,
	back: 'hallway',
	left: null,
	right: null,
	checkForRestrictionItem: checkForRestrictionItem,
	use: {
		powder: {
			text: 'mixed powder into beaker. got acid.',
			itemName: 'acid powder',
			restrictionItem: 'beaker water'
		},
		coat: { text: 'looking nice with that coat', itemName: 'coat' },
		acid: { text: 'killed monster', itemName: 'acid' }
	}
};
let hallway = {
	name: 'hallway',
	checkForKey: checkForKey,
	forward: 'monster',
	back: 'storage',
	left: 'lab',
	right: 'bathroom',
	checkForRestrictionItem: checkForRestrictionItem,
	use: {
		powder: {
			text: 'mixed powder into beaker. got acid.',
			itemName: 'acid powder',
			restrictionItem: 'beaker water'
		},
		coat: { text: 'looking nice with that coat', itemName: 'coat' }
	}
};
const bathroom = {
	name: 'bathroom',
	checkForKey: checkForKey,
	forward: null,
	back: 'hallway',
	left: null,
	right: null,
	checkForRestrictionItem: checkForRestrictionItem,
	check: {
		toilet: { name: 'key', itemName: 'storage key' },
		sink: { text: 'filled beaker with water', name: 'water', itemName: 'beaker water', restrictionItem: 'beaker' }
	},
	grab: {
		mirror: { name: 'broken mirror', itemName: 'broken mirror' }
	},
	use: {
		powder: {
			text: 'mixed powder into beaker. got acid.',
			itemName: 'acid powder',
			restrictionItem: 'beaker water'
		},
		coat: { text: 'looking nice with that coat', itemName: 'coat' }
	}
};
const storage = {
	name: 'storage',
	checkForKey: checkForKey,
	forward: 'table',
	back: 'hallway',
	left: null,
	right: null,
	checkForRestrictionItem: checkForRestrictionItem,
	use: {
		powder: {
			text: 'mixed powder into beaker. got acid.',
			itemName: 'acid powder',
			restrictionItem: 'beaker water'
		},
		coat: { text: 'looking nice with that coat', itemName: 'coat' }
	}
};
const table = {
	name: 'table',
	key: 'storage key',
	checkForKey: checkForKey,
	forward: null,
	back: 'storage',
	left: 'hole',
	right: null,
	checkForRestrictionItem: checkForRestrictionItem,
	check: {
		table: { name: 'powder', itemName: 'acid powder' }
	},
	use: {
		powder: {
			text: 'mixed powder into beaker. got acid.',
			itemName: 'acid powder',
			restrictionItem: 'beaker water'
		},
		coat: { text: 'looking nice with that coat', itemName: 'coat' }
	}
};
const hole = {
	name: 'hole',
	checkForKey: checkForKey,
	forward: null,
	back: 'table',
	left: null,
	right: null,
	checkForRestrictionItem: checkForRestrictionItem,
	check: {
		hole: { name: 'key', itemName: 'lab key' }
	},
	use: {
		powder: {
			text: 'mixed powder into beaker. got acid.',
			itemName: 'acid powder',
			restrictionItem: 'beaker water'
		},
		coat: { text: 'looking nice with that coat', itemName: 'coat' }
	}
};
const exit = {
	name: 'exit',
	checkForKey: checkForKey,
	forward: 'win',
	back: 'hallway',
	left: null,
	right: null,
	checkForRestrictionItem: checkForRestrictionItem,
	use: {
		coat: { text: 'looking nice with that coat', itemName: 'coat' }
	}
};
const win = {
	name: 'win',
	key: 'exit key',
	checkForKey: checkForKey,
	forward: null,
	back: 'exit',
	left: null,
	right: null
};
const scene = {
	lab,
	monster,
	hallway,
	bathroom,
	storage,
	table,
	hole,
	exit,
	win
};
let currentLocation = 'hallway';

export const handlingInput = (input, state) => {
	const inputWords = input.split(' ');
	const firstWord = reduceWord(inputWords[0]);
	const secondWord = inputWords[1];
	const actionInCurrentLocation = scene[currentLocation][firstWord];
	const propertyOfCurrentLocation = scene[currentLocation][secondWord];
	if (inputWords.length === 2) {
		if (firstWord === 'move') {
			if (propertyOfCurrentLocation) {
				if (scene[propertyOfCurrentLocation].checkForKey()) {
					currentLocation = scene[propertyOfCurrentLocation].name;
					return { type: CHANGE_SCENE, payload: currentLocation };
				} else {
					return { type: ADD_DIALOGUE, payload: needKeyResponse };
				}
			}
		} else if (firstWord === 'grab') {
			if (actionInCurrentLocation) {
				if (actionInCurrentLocation[secondWord]) {
					if (inventory[actionInCurrentLocation[secondWord].itemName] === undefined) {
						inventory[actionInCurrentLocation[secondWord].itemName] = true;
						console.log(inventory);
						const text = actionInCurrentLocation[secondWord].text
							? actionInCurrentLocation[secondWord].text
							: `grabbed ${secondWord}`;
						return { type: ADD_DIALOGUE, payload: text };
					}
				}
			}
		} else if (firstWord === 'check') {
			if (actionInCurrentLocation) {
				if (actionInCurrentLocation[secondWord]) {
					if (scene[currentLocation].checkForRestrictionItem('check', secondWord)) {
						inventory[actionInCurrentLocation[secondWord].itemName] = true;
						const text = actionInCurrentLocation[secondWord].text
							? actionInCurrentLocation[secondWord].text
							: `grabbed ${actionInCurrentLocation[secondWord].name}`;
						return { type: ADD_DIALOGUE, payload: text };
					}
					if (inventory[actionInCurrentLocation[secondWord][1]] === undefined) {
					}
				}
			}
		} else if (firstWord === 'use') {
			if (actionInCurrentLocation) {
				if (actionInCurrentLocation[secondWord]) {
					if (scene[currentLocation].checkForRestrictionItem('use', secondWord)) {
						if (inventory[actionInCurrentLocation[secondWord].itemName]) {
							if (secondWord === 'acid') {
								inventory[actionInCurrentLocation[secondWord].itemName] = null;
								scene['hallway'].forward = 'exit';
								currentLocation = 'exit';
								return { type: CHANGE_SCENE, payload: currentLocation };
							} else if (secondWord == 'powder') {
								inventory['acid'] = true;
								inventory[actionInCurrentLocation[secondWord].itemName] = null;
								const text = actionInCurrentLocation[secondWord].text
									? actionInCurrentLocation[secondWord].text
									: `${firstWord} ${secondWord}`;
								return { type: ADD_DIALOGUE, payload: text };
							}
							inventory[actionInCurrentLocation[secondWord].itemName] = null;
							const text = actionInCurrentLocation[secondWord].text
								? actionInCurrentLocation[secondWord].text
								: `${firstWord} ${secondWord}`;
							return { type: ADD_DIALOGUE, payload: text };
						}
					}
				}
			}
		}
	}
	return { type: ADD_DIALOGUE, payload: invalidResponse };
};
