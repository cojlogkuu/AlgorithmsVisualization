import React, {useMemo, useState} from 'react';
import './dataStructurePage.css';
import RecursiveTreeRender from "../../dataStructureComp/recursiveTreeRender/RecursiveTreeRender.jsx";
import {useSelector, useDispatch} from "react-redux";
import {
	resetNotBalancedTree,
	addVertex,
	setVertexesToRotate,
	resetVertexesToRotate,
	setIsRunning,
	deleteVertexAction,
} from "../../../assets/dataStructureStore/avlTreeSlice.js";
import {searchingVertexAnimation} from "../../../assets/dataStructureStore/avlTreeThunks.js";
import {Link} from "react-router-dom";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const DataStructurePage = () => {
	const {avlTree, notBalancedTree, currentVertex} = useSelector((state) => state.avlTree);
	const dispatch = useDispatch();

	const [vertexToAdd, setVertexToAdd] = useState('');
	const [vertexToDelete, setVertexToDelete] = useState('');
	const [vertexToFind, setVertexToFind] = useState('');

	const maxWidthBetweenVortexes = useMemo(() => {
		if (avlTree.height === 1) {
			return 0
		} else {
			return 80 * 2 ** (avlTree.height - 2)
		}
	}, [avlTree]);

	const heightBetweenVortexes = 100;

	return (
			<main className='dataStructurePage'>
				<div className="container">
					<div className="buttonsContainer">
						<input
								type="number"
								min="-999"
								max="9999"
								value={vertexToAdd}
								onChange={(e) => {
									setVertexToAdd(e.target.value)
								}}
						/>
						<button
								onClick={() => {
									setVertexToAdd('');
									dispatch(searchingVertexAnimation(Number(vertexToAdd), async (wasFound) => {
										if (wasFound) {
											alert('This vertex already exist')
										} else {
											dispatch(setIsRunning(true));
											dispatch(addVertex(Number(vertexToAdd)));
											await delay(100);
											dispatch(setVertexesToRotate(Number(vertexToAdd)));
											await delay(1500);
											dispatch(resetVertexesToRotate());
											dispatch(setIsRunning(false));
											dispatch(resetNotBalancedTree());
										}
									}))
								}}
						>Add vertex
						</button>
						<input
								type="number"
								min="-999"
								max="9999"
								value={vertexToDelete}
								onChange={(e) => {
									setVertexToDelete(e.target.value);
								}}
						/>
						<button
								onClick={() => {
									setVertexToDelete('');
									dispatch(searchingVertexAnimation(Number(vertexToDelete), async (wasFound) => {
										if (!wasFound) {
											alert('This vertex dont exist')
										} else {
											dispatch(setIsRunning(true));
											dispatch(deleteVertexAction(Number(vertexToDelete)));
											await delay(1000);
											dispatch(setVertexesToRotate());
											await delay(1500);
											dispatch(resetVertexesToRotate());
											dispatch(setIsRunning(false));
											dispatch(resetNotBalancedTree());
										}
									}))

								}}
						>Delete vertex
						</button>
						<input
								type="number"
								min="-999"
								max="9999"
								value={vertexToFind}
								onChange={(e) => {
									setVertexToFind(e.target.value)
								}}
						/>
						<button
								onClick={() => {
									setVertexToFind('');
									dispatch(searchingVertexAnimation(Number(vertexToFind)));
								}}
						>Find vertex
						</button>
						<Link to='/'>Go back</Link>
					</div>
					<svg width='1300' height='700'>
						<RecursiveTreeRender
								vertex={notBalancedTree || avlTree}
								x={1300 / 2}
								y={40}
								widthBetweenVortexes={maxWidthBetweenVortexes}
								heightBetweenVortexes={heightBetweenVortexes}
								currentVertex={currentVertex}
						/>
					</svg>
				</div>
			</main>
	);
};

export default DataStructurePage;