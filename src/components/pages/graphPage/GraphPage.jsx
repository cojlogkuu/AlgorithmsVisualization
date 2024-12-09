import React, {useState} from 'react';
import './graphPage.css';
import GraphCreation from "../../graphComp/graphCreation/GraphCreation.jsx";
import GraphVisualization from "../../graphComp/graphVisualization/GraphVisualization.jsx";

const GraphPage = () => {
	const [edgesList, setEdgesList] = React.useState([]);
	const [isRunning, setIsRunning] = useState(false);

	return (
			<main className='graphPage'>
				<div className="container">
					<h1 className='title'>
						Undirected unweighted graph represented by list of edges - DFS
					</h1>
					<GraphVisualization
							isRunning={isRunning}
							setIsRunning={setIsRunning}
							edgesList={edgesList}
					/>
					<GraphCreation
							isRunning={isRunning}
							edgesList={edgesList}
							setEdgesList={setEdgesList}
					/>
				</div>
			</main>
	);
};

export default GraphPage;