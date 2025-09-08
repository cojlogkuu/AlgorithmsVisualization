import React from 'react';
import './edge.css';

const Edge = ({x1, y1, x2, y2}) => {
	return (
			<line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2"/>
	);
};

export default Edge;