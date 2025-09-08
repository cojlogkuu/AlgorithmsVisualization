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

function makeAdjacencyList(edges) {
	const adjacencyList = {};

	edges.forEach(([start, end]) => {
		if (!(start in adjacencyList)) {
			adjacencyList[start] = [];
		}
			adjacencyList[start].push(end);

		if (!(end in adjacencyList)) {
			adjacencyList[end] = [];
		}
			adjacencyList[end].push(start);
	})

	return adjacencyList;
}

export function getStepsOfDFS(edges, startNode) {
	const stack = [{ node: startNode, comeFromNode: null }];
	const visited = new Set();
	const resultStepsArrayOfObjects = [];
	let currentStep = 0;
	const adjacencyList = makeAdjacencyList(edges);

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

			adjacencyList[currentNode].forEach((neighbor) => {
				if (!visited.has(neighbor)) {
					stack.unshift({node: neighbor, comeFromNode: currentNode});
				}
			});
		}
	}
	console.log(resultStepsArrayOfObjects);
	return resultStepsArrayOfObjects;
}
