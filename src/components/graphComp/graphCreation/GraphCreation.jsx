import React, {useState} from 'react';
import './graphCreation.css';
import ListOfEdges from "../listOfEdges/ListOfEdges.jsx";

const GraphCreation = ({edgesList, setEdgesList, isRunning}) => {
	const [edge, setEdge] = useState(['', '']);
	const [edgeToDelete, setEdgeToDelete] = useState('');

	const handleAddEdge = () => {
		if (edge[0] === '' || edge[1] === '') {
			alert('Set two vertexes');
		} else if (edge[0] === edge[1]) {
			alert('Edge cannot be between 1 vertex!');
		} else {
			let isEdgeRepeat = false;
			edgesList.forEach(currEdge => {
				if (currEdge.includes(edge[0]) && currEdge.includes(edge[1])) {
					isEdgeRepeat = true;
				}
			});
			if (isEdgeRepeat) {
				alert('This edge already exists!');
			} else {
				setEdgesList(prev => [...prev, edge]);
				setEdge(['', '']);
			}
		}
	}

	const handleDeleteEdge = () => {
		const edgeNumber = Number(edgeToDelete);
		if (edgeToDelete !== '' && Number.isInteger(edgeNumber) && edgeNumber >= 0) {
			setEdgesList((prev) => prev.filter((_, index) => index !== edgeNumber));
			setEdgeToDelete('');
		} else {
			alert('Write № of edge you want to delete!');
		}
	}

	return (
			<div className='graphCreation'>
				<div className="buttonsContainer">
					<div className="addEdge">
						<input
								type="text"
								value={edge[0]}
								onChange={(e) => {
									setEdge(prev => [e.target.value.replace(' ', ''), prev[1]]);
								}}
						/>
						<input
								type="text"
								value={edge[1]}
								onChange={(e) => {
									setEdge(prev => [prev[0], e.target.value.replace(' ', '')]);
								}}
						/>
						<button
								disabled={isRunning}
								onClick={handleAddEdge}
						>Add edge
						</button>
					</div>
					<div className="deleteEdge">
						<input
								min='0'
								type="number"
								value={edgeToDelete}
								onChange={(e) => {
										setEdgeToDelete(e.target.value.replace(' ', ''))}
								}
						/>
						<button
								disabled={isRunning}
								onClick={handleDeleteEdge}
						>Delete edge by №
						</button>
					</div>
				</div>
				<ListOfEdges edges={edgesList}/>
			</div>
	);
};

export default GraphCreation;