import {setCurrentVertex} from "./avlTreeSlice.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const searchingVertexAnimation = (value, wasFoundCallBack = () => {
}) => async (dispatch, getState) => {
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
			return vertex;
		}

		if (vertex.value > value) {
			return await recursiveSearching(vertex.left);
		} else {
			return await recursiveSearching(vertex.right);
		}
	};

	const {avlTree} = getState().avlTree;
	const foundVertex = await recursiveSearching(avlTree);
	wasFoundCallBack(foundVertex);
	dispatch(setCurrentVertex(null));
}

export const searchingMinVertexAnimation = (vertex, next) => async (dispatch, getState) => {
	const recursiveSearching = async (vertex) => {
		dispatch(setCurrentVertex(vertex.value));
		await delay(1000);

		if (vertex.left) {
			await recursiveSearching(vertex.left);
		}
	}
	if (vertex.right) {
		dispatch(setCurrentVertex(vertex.right.value));
		await delay(1000);
		await recursiveSearching(vertex.right);
	}
	await next();
	dispatch(setCurrentVertex(null));
}