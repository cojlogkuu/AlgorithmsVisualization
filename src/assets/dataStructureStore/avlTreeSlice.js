import {createSlice} from '@reduxjs/toolkit';
import {
	insertVertex,
	insertVertexWithoutRotating,
	getMinUnbalanceVertex,
	getBalanceFactor,
	deleteVertex,
	deleteVertexWithoutRotating,
} from "./avlTreeUtils.js";

const avlTreeSlice = createSlice({
	name: 'avlTree',
	initialState: {
		avlTree: {},
		notBalancedTree: null,
		currentVertex: null,
		vertexesToRotate: {},
		isRunning: false,
	},
	reducers: {
		setCurrentVertex: (state, action) => {
			state.currentVertex = action.payload;
		},

		addVertex: (state, action) => {
			const value = action.payload;

			if (Object.keys(state.avlTree).length === 0) {
				state.avlTree = {
					value,
					left: null,
					right: null,
					height: 1
				}
			} else {
				state.notBalancedTree = JSON.parse(JSON.stringify(state.avlTree));
				state.avlTree = insertVertex(state.avlTree, value);
				state.notBalancedTree = insertVertexWithoutRotating(state.notBalancedTree, value);
			}
		},

		deleteVertexAction: (state, action) => {
			const value = action.payload;

			if (state.avlTree.value === value && !state.avlTree.right && !state.avlTree.left) {
				state.avlTree = {}
			} else {
				state.notBalancedTree = JSON.parse(JSON.stringify(state.avlTree));
				state.avlTree = deleteVertex(state.avlTree, value);
				state.notBalancedTree = deleteVertexWithoutRotating(state.notBalancedTree, value);
			}
		},

		resetNotBalancedTree: (state, action) => {
			state.notBalancedTree = null;
		},

		resetVertexesToRotate: (state, action) => {
			state.vertexesToRotate = {};
		},

		setVertexesToRotate: (state, action) => {
			const notBalancedVertex = getMinUnbalanceVertex(state.notBalancedTree);
			if (notBalancedVertex) {
				const heightOfVertex = notBalancedVertex.height;
				const balanceFactor = getBalanceFactor(notBalancedVertex);

				// LL rotation
				if (balanceFactor > 1 && getBalanceFactor(notBalancedVertex.left) >= 0) {
					state.vertexesToRotate = {
						[notBalancedVertex.value]: {
							y: 100,
							x: 20 * 2 ** (heightOfVertex - 2),
						},
						[notBalancedVertex.left.value]: {
							y: -100,
							x: 20 * 2 ** (heightOfVertex - 2),
						},
						[notBalancedVertex.left.left.value]: {
							y: -100,
							x: 20 * 2 ** (heightOfVertex - 3)
						},
						[notBalancedVertex.right?.value]: {
							y: +100,
							x: 20 * 2 ** (heightOfVertex - 3)
						},
						[notBalancedVertex.left.right?.value]: {
							y: 0,
							x: 40 * 2 ** (heightOfVertex - 3)
						}
					}
				}

				// RR rotation
				if (balanceFactor < -1 && getBalanceFactor(notBalancedVertex.right) <= 0) {
					state.vertexesToRotate = {
						[notBalancedVertex.value]: {
							y: 100,
							x: -20 * 2 ** (heightOfVertex - 2),
						},
						[notBalancedVertex.right.value]: {
							y: -100,
							x: -20 * 2 ** (heightOfVertex - 2),
						},
						[notBalancedVertex.right.right.value]: {
							y: -100,
							x: -20 * 2 ** (heightOfVertex - 3)
						},
						[notBalancedVertex.left?.value]: {
							y: +100,
							x: -20 * 2 ** (heightOfVertex - 3)
						},
						[notBalancedVertex.right.left?.value]: {
							y: 0,
							x: -40 * 2 ** (heightOfVertex - 3)
						}
					}
				}

				// LR rotation
				if (balanceFactor > 1 && getBalanceFactor(notBalancedVertex.left) < 0) {
					state.vertexesToRotate = {
						[notBalancedVertex.value]: {
							y: +100,
							x: 20 * 2 ** (heightOfVertex - 2),
						},
						[notBalancedVertex.left.value]: {
							y: 0,
							x: 0,
						},
						[notBalancedVertex.left.right.value]: {
							y: -200,
							x: 20 * 2 ** (heightOfVertex - 3)
						},
						[notBalancedVertex.right?.value]: {
							y: 100,
							x: 20 * 2 ** (heightOfVertex - 3)
						},
						[notBalancedVertex.left.right.left?.value]: {
							y: -100,
							x: 20 * 2 ** (heightOfVertex - 4)
						},
						[notBalancedVertex.left.right.right?.value]: {
							y: -100,
							x: 3 * 20 * 2 ** (heightOfVertex - 4)
						}
					}
				}

				// RL rotation
				if (balanceFactor < -1 && getBalanceFactor(notBalancedVertex.right) > 0) {
					state.vertexesToRotate = {
						[notBalancedVertex.value]: {
							y: +100,
							x: -20 * 2 ** (heightOfVertex - 2),
						},
						[notBalancedVertex.right.value]: {
							y: 0,
							x: 0,
						},
						[notBalancedVertex.right.left.value]: {
							y: -200,
							x: -20 * 2 ** (heightOfVertex - 3)
						},
						[notBalancedVertex.left?.value]: {
							y: 100,
							x: -20 * 2 ** (heightOfVertex - 3)
						},
						[notBalancedVertex.right.left.right?.value]: {
							y: -100,
							x: -20 * 2 ** (heightOfVertex - 4)
						},
						[notBalancedVertex.right.left.left?.value]: {
							y: -100,
							x: -3 * 20 * 2 ** (heightOfVertex - 4)
						}
					}
				}
			}
		},

		setIsRunning(state, action) {
			state.isRunning = action.payload;
		}
	},
});

export const {
	setCurrentVertex,
	addVertex,
	resetNotBalancedTree,
	resetVertexesToRotate,
	setVertexesToRotate,
	setIsRunning,
	deleteVertexAction,
} = avlTreeSlice.actions;

export default avlTreeSlice.reducer;
