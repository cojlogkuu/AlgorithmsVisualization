export function buildGraphData (edges) {
	const nodes = [];
	const links = [];

	edges.forEach(([source, target]) => {
		nodes.push({ id: source, color: "yellow" });
		nodes.push({ id: target, color: "yellow" });
		links.push({ source, target, color: "gray" });
	});

	const uniqueNodes = Array.from(new Map(nodes.map((node) => [node.id, node])).values());

	return { nodes: uniqueNodes, links };
}

export function getStepsOfDFS(edges, startNode) {
	const stack = [{ node: startNode, comeFromNode: null }];
	const visited = new Set();
	const resultStepsArrayOfObjects = [];
	let currentStep = 0;

	while (stack.length > 0) {
		const { node: currentNode, comeFromNode } = stack.shift();

		resultStepsArrayOfObjects.push({
			step: currentStep++,
			currentNode,
			comeFromNode,
			visitedNodes: Array.from(visited),
			isVisited: true,
		});

		if (!visited.has(currentNode)) {
			visited.add(currentNode);
			resultStepsArrayOfObjects[currentStep-1].isVisited = false;
			resultStepsArrayOfObjects[currentStep-1].visitedNodes = Array.from(visited);

			let neighbors = edges.map(edge => {
				if (edge[0] === currentNode) {return edge[1];}
				else if (edge[1] === currentNode) {return edge[0];}
			});
			neighbors =  neighbors.filter(edge => edge !== undefined);

			neighbors.forEach((neighbor) => {
				if (!visited.has(neighbor)) {
					stack.unshift({node: neighbor, comeFromNode: currentNode});
				}
			});
		}
	}
	return resultStepsArrayOfObjects;
}
