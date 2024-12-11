import React from 'react';
import './vertex.css';
import {useSelector} from "react-redux";

const Vertex = ({isCurrent, value, x, y, height}) => {
	const {vertexesToRotate, isRunning} = useSelector((state) => state.avlTree);

	return (
			<g
				transform={`translate(${vertexesToRotate[value]?.x || 0},${vertexesToRotate[value]?.y || 0})`}
				style={isRunning ? {transition: 'all 1s ease'}: {transition: 'none'}}
			>
				<circle cx={x} cy={y} r={20} fill={isCurrent ? 'green' : 'black'} stroke="black"/>
				<text x={x} y={y} fill="white" textAnchor="middle" alignmentBaseline="middle" fontSize="14">
					{value}
				</text>
				<text x={x} y={y - 30} fill="black" textAnchor="middle" alignmentBaseline="middle" fontSize="16">
					{height}
				</text>
			</g>
	);
};

export default Vertex;