export const HANDLE_INVENTORY = 'HANDLE_INVENTORY';
export const CHANGE_SCENE = 'CHANGE_SCENE';

export const handlingInventory = item => {
	return { type: HANDLE_INVENTORY, payload: item };
};
export const changingScene = scene => {
	return { type: CHANGE_SCENE, payload: scene };
};
