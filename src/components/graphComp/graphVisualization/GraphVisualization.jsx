import React, {useEffect, useState} from 'react';
import './graphVisualization.css';
import {buildGraphData, getStepsOfDFS} from "../../../assets/graphUtils/graphUtils.js";
import {Graph} from "react-d3-graph/src";
import {Link} from "react-router-dom";

const graphConfig = {
	node: {
		color: "gray",
		size: 300,
		labelPosition: 'center',
	},
	link: {},
	width: 600,
	height: 450,
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const GraphVisualization = ({edgesList, isRunning, setIsRunning}) => {
	const [graphData, setGraphData] = useState({nodes: [], links: []});
	const [visited, setVisited] = useState([]);
	const [isPaused, setIsPaused] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [startVertex, setStartVertex] = useState('');
	const [dfsSteps, setDFsSteps] = useState([]);

	useEffect(() => {
		setGraphData(buildGraphData(edgesList));
	}, [edgesList])

	useEffect(() => {
		if (currentStep < dfsSteps.length && isRunning && !isPaused) {
			performStep(currentStep).then()
		}
	}, [currentStep, isRunning, isPaused])

	const paintNode = (nodeId, color) => {
		setGraphData(prevData => ({
			...prevData,
			nodes: prevData.nodes.map(node =>
					node.id === nodeId ? {...node, color} : node
			),
		}))
	}

	const paintLink = (node1, node2, color) => {
		setGraphData(prevData => ({
			...prevData,
			links: prevData.links.map(link =>
					link.source === node1 && link.target === node2 || link.source === node2 && link.target === node1
							? {...link, color}
							: link
			),
		}))
	}

	const performStep = async (stepNumber) => {
		const {currentNode, comeFromNode, visitedNodes, isVisited} = dfsSteps[stepNumber];

		if (!isRunning) return;
		paintNode(comeFromNode, 'red');
		await delay(800);
		if (!isRunning) return;
		paintLink(currentNode, comeFromNode, 'red');
		await delay(800);
		if (!isRunning) return;

		if (!isVisited) {
			paintNode(comeFromNode, 'blue');
			paintLink(currentNode, comeFromNode, 'blue');
			paintNode(currentNode, 'blue');
		} else {
			paintNode(comeFromNode, 'blue');
			paintLink(currentNode, comeFromNode, 'gray');
		}
		if (!isRunning) return;

		setVisited(visitedNodes);
		setCurrentStep(stepNumber + 1);
	}

	const setGraphAtStep = (stepNumber) => {
		setGraphData(buildGraphData(edgesList));
		const {visitedNodes} = dfsSteps[stepNumber];
		setVisited(visitedNodes);
		visitedNodes.forEach(node => paintNode(node, 'blue'));
		for (let i = 0; i <= stepNumber; i++) {
			const {currentNode, comeFromNode, isVisited} = dfsSteps[i];
			if (!isVisited) {
				paintLink(currentNode, comeFromNode, 'blue');
			}
		}
	}

	const handleStartAlgorithm = () => {
		let isVertexExist = false;
		edgesList.forEach(edge => {
			if (edge.includes(startVertex)) {
				isVertexExist = true;
			}
		});
		if (isVertexExist) {
			setDFsSteps(getStepsOfDFS(edgesList, startVertex));
			setIsRunning(true);
		} else {
			alert('This vertex doesnt exist!');
		}
	}

	const handleStopAlgorithm = async () => {
		setIsRunning(false);
		setIsPaused(false);
		await delay(1600);
		setCurrentStep(0);
		setGraphData(buildGraphData(edgesList));
		setVisited([]);
	}

	const handleStepBack = () => {
		if (currentStep > 0) {
			setGraphAtStep(currentStep - 1);
			setCurrentStep(currentStep - 1);
		}
	}


	return (
			<div className="graphVisualization">
				<div className="graphContainer">
					<Graph id='graph-id' data={graphData} config={graphConfig}/>
				</div>
				<h4 className='path'>Path: {visited.join(" -> ")}</h4>
				<div className="buttonsContainer">
					<div className="startInput">
						<label htmlFor="start">Set<br/>start:</label>
						<input
								id="start"
								type="text"
								value={startVertex}
								onChange={(e) => {
									setStartVertex(e.target.value.replace(' ', ''))
								}}
						/>
					</div>
					<button
							disabled={isRunning}
							onClick={handleStartAlgorithm}
					>{isRunning ? 'Running' : 'Start'}
					</button>
					<button
							onClick={handleStopAlgorithm}
					>Stop
					</button>
					<button
							disabled={!isRunning}
							onClick={() => setIsPaused(prev => !prev)}
					>{isPaused ? 'Resume' : 'Pause'}</button>
					<button
							disabled={!isPaused}
							onClick={handleStepBack}
					>Step back
					</button>
					<Link to='/'>Go back</Link>
				</div>
			</div>
	);
};

export default GraphVisualization;