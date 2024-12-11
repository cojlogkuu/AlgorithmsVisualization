import React from 'react';
import Vertex from "../vertex/Vertex.jsx";
import Edge from "../edge/Edge.jsx";
import {useSelector} from "react-redux";


const RecursiveTreeRender = ({vertex, x, y, widthBetweenVortexes, heightBetweenVortexes, currentVertex}) => {
	if (Object.keys(vertex).length === 0) return;

	const {isRunning} = useSelector((state) => state.avlTree);

	return (
			<g id={vertex.value}>
				<Vertex
						x={x}
						y={y}
						isCurrent={vertex.value === currentVertex}
						value={vertex.value}
						height={vertex.height}
				/>
				{vertex.left && (
						<>
							{!isRunning && (
									<Edge
											x1={x}
											y1={y + 10}
											x2={x - widthBetweenVortexes / 2}
											y2={y + heightBetweenVortexes}
									/>
							)}
							<RecursiveTreeRender
									vertex={vertex.left}
									x={x - widthBetweenVortexes / 2}
									y={y + heightBetweenVortexes}
									widthBetweenVortexes={widthBetweenVortexes / 2}
									heightBetweenVortexes={heightBetweenVortexes}
									currentVertex={currentVertex}
							/>
						</>
				)}
				{vertex.right && (
						<>
							{!isRunning && (
									<Edge
											x1={x}
											y1={y + 10}
											x2={x + widthBetweenVortexes / 2}
											y2={y + heightBetweenVortexes}
									/>
							)}
							<RecursiveTreeRender
									vertex={vertex.right}
									x={x + widthBetweenVortexes / 2}
									y={y + heightBetweenVortexes}
									widthBetweenVortexes={widthBetweenVortexes / 2}
									heightBetweenVortexes={heightBetweenVortexes}
									currentVertex={currentVertex}
							/>
						</>
				)}
			</g>
	);
};

export default RecursiveTreeRender;