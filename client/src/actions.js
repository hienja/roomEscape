export const ADD_ITEM = 'ADD_IIEM';
export const USE_ITEM = 'USE_ITEM';
export const CHANGE_SCENE = 'CHANGE_SCENE';

export const addingItem = item => {
	return { type: ADD_IIEM, payload: item };
};
export const usingItem = item => {
	return { type: USE_ITEM, payload: item };
};
export const changingScene = scene => {
	return { type: CHANGE_SCENE, payload: scene };
};
