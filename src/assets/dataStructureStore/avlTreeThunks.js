import {setCurrentVertex} from "./avlTreeSlice.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const searchingVertexAnimation = (value, wasFound = () => {}) => async (dispatch, getState) => {
	const recursiveSearching = async (vertex) => {
		if (!vertex) return;

		dispatch(setCurrentVertex(vertex.value));
		await delay(1000);

		if (vertex.value === value) {
			dispatch(setCurrentVertex(null));
			await delay(180);
			dispatch(setCurrentVertex(vertex.value));
			await delay(180);
			dispatch(setCurrentVertex(null));
			await delay(180);
			dispatch(setCurrentVertex(vertex.value));
			await delay(180);
			dispatch(setCurrentVertex(null));
			await delay(180);
			dispatch(setCurrentVertex(vertex.value));
			await delay(180);
			dispatch(setCurrentVertex(null));
			return true
		}

		if (vertex.value > value) {
			return await recursiveSearching(vertex.left);
		} else {
			return await recursiveSearching(vertex.right);
		}
	};

	const {avlTree} = getState().avlTree;
	const isFound = await recursiveSearching(avlTree);
	wasFound(isFound);
	dispatch(setCurrentVertex(null));
};