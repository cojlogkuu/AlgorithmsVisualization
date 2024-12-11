import React from "react";
import "./listOfEdges.css";

const EdgeList = ({ edges }) => {
	return (
			<div className="edgeList">
				<table>
					<thead>
					<tr>
						<th colSpan="3">List of edges</th>
					</tr>
					<tr>
						<th>№</th>
						<th>Vertex 1</th>
						<th>Vertex 2</th>
					</tr>
					</thead>
					<tbody>
					{edges.map((edge, index) => (
							<tr key={index}>
								<td>{index}</td>
								<td>{edge[0]}</td>
								<td>{edge[1]}</td>
							</tr>
					))}
					</tbody>
				</table>
			</div>
	);
};

export default EdgeList;
