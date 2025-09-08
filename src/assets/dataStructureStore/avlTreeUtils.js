function getHeight(vertex) {
	if (!vertex) {
		return 0
	}
	return vertex.height;
}

export function getBalanceFactor(vertex) {
	if (vertex === null) {
		return 0
	} else {
		return getHeight(vertex.left) - getHeight(vertex.right)
	}
}

function rotateLeft(vertex) {
	const leftChild = vertex.left;
	const leftRightGrandChild = leftChild.right;

	leftChild.right = vertex;
	vertex.left = leftRightGrandChild;

	vertex.height = 1 + Math.max(getHeight(vertex.left), getHeight(vertex.right));
	leftChild.height = 1 + Math.max(getHeight(leftChild.left), getHeight(leftChild.right));

	return leftChild;
}

function rotateRight(vertex) {
	const rightChild = vertex.right;
	const rightLeftGrandChild = rightChild.left;

	rightChild.left = vertex;
	vertex.right = rightLeftGrandChild;

	vertex.height = 1 + Math.max(getHeight(vertex.left), getHeight(vertex.right));
	rightChild.height = 1 + Math.max(getHeight(rightChild.left), getHeight(rightChild.right));

	return rightChild;
}

function findMinValue(vertex) {
	if (vertex.left === null) {
		return vertex.value
	} else {
		return findMinValue(vertex.left)
	}
}

export function insertVertex(vertex, newValue) {
	if (vertex === null) {
		return {value: newValue, height: 1, left: null, right: null};
	}

	if (newValue < vertex.value) {
		vertex.left = insertVertex(vertex.left, newValue)
	} else if (newValue > vertex.value) {
		vertex.right = insertVertex(vertex.right, newValue)
	} else {
		return vertex
	}

	vertex.height = 1 + Math.max(getHeight(vertex.left), getHeight(vertex.right));

	const balanceFactor = getBalanceFactor(vertex);

	if (balanceFactor > 1 && newValue < vertex.left.value) {
		return rotateLeft(vertex)
	}

	if (balanceFactor < -1 && newValue > vertex.right.value) {
		return rotateRight(vertex)
	}

	if (balanceFactor > 1 && newValue > vertex.left.value) {
		vertex.left = rotateRight(vertex.left);
		return rotateLeft(vertex);
	}

	if (balanceFactor < -1 && newValue < vertex.right.value) {
		vertex.right = rotateLeft(vertex.right);
		return rotateRight(vertex);
	}

	return vertex;
}

export function insertVertexWithoutRotating(vertex, newValue) {
	if (vertex === null) {
		return {value: newValue, height: 1, left: null, right: null};
	}

	if (newValue < vertex.value) {
		vertex.left = insertVertexWithoutRotating(vertex.left, newValue);
	} else if (newValue > vertex.value) {
		vertex.right = insertVertexWithoutRotating(vertex.right, newValue);
	} else {
		return vertex;
	}

	vertex.height = 1 + Math.max(getHeight(vertex.left), getHeight(vertex.right));

	return vertex;
}

export function deleteVertex(vertex, deleteValue) {
	if (vertex === null) return null;

	if (vertex.value > deleteValue) {
		vertex.left = deleteVertex(vertex.left, deleteValue)
	} else if (vertex.value < deleteValue) {
		vertex.right = deleteVertex(vertex.right, deleteValue)
	} else {
		if (vertex.left !== null && vertex.right !== null) {
			const minValueOfRightChild = findMinValue(vertex.right);

			vertex.value = minValueOfRightChild;
			vertex.right = deleteVertex(vertex.right, minValueOfRightChild);
		} else {
			const child = vertex.left ? vertex.left : vertex.right;

			if (!child) {
				return null
			} else {
				return child
			}
		}
	}

	vertex.height = 1 + Math.max(getHeight(vertex.left), getHeight(vertex.right));

	const balance = getBalanceFactor(vertex);

	if (balance > 1 && getBalanceFactor(vertex.left) >= 0) {
		return rotateLeft(vertex);
	}

	if (balance > 1 && getBalanceFactor(vertex.left) < 0) {
		vertex.left = rotateRight(vertex.left);
		return rotateLeft(vertex);
	}

	if (balance < -1 && getBalanceFactor(vertex.right) <= 0) {
		return rotateRight(vertex);
	}

	if (balance < -1 && getBalanceFactor(vertex.right) > 0) {
		vertex.right = rotateLeft(vertex.right);
		return rotateRight(vertex);
	}

	return vertex;
}

export function deleteVertexWithoutRotating(vertex, deleteValue) {
	if (vertex === null) return null;

	if (vertex.value > deleteValue) {
		vertex.left = deleteVertexWithoutRotating(vertex.left, deleteValue)
	} else if (vertex.value < deleteValue) {
		vertex.right = deleteVertexWithoutRotating(vertex.right, deleteValue)
	} else {
		if (vertex.left !== null && vertex.right !== null) {
			const minValueOfRightChild = findMinValue(vertex.right);

			vertex.value = minValueOfRightChild;
			vertex.right = deleteVertexWithoutRotating(vertex.right, minValueOfRightChild);
		} else {
			const child = vertex.left ? vertex.left : vertex.right;

			if (!child) {
				return null
			} else {
				return child
			}
		}
	}

	vertex.height = 1 + Math.max(getHeight(vertex.left), getHeight(vertex.right));

	return vertex;
}

function getNotBalancedVertex(vertex, arrayOfUnbalancedVertexes) {
	if (vertex === null) return null;

	const balanceFactor = getBalanceFactor(vertex);
	const isVertexInArray = arrayOfUnbalancedVertexes.find(cVertex => cVertex.value === vertex.value);

	if (Math.abs(balanceFactor) > 1 && !isVertexInArray) {
		return vertex;
	}

	const leftUnbalanced = getNotBalancedVertex(vertex.left, arrayOfUnbalancedVertexes);
	if (leftUnbalanced) {
		return leftUnbalanced;
	}

	const rightUnbalanced = getNotBalancedVertex(vertex.right, arrayOfUnbalancedVertexes);
	if (rightUnbalanced) {
		return rightUnbalanced;
	}
}

export function getMinUnbalanceVertex(vertex) {
	let arrayOfUnbalancedVertexes = [];

	while (true) {
		const unBalanceVertex = getNotBalancedVertex(vertex, arrayOfUnbalancedVertexes);
		if (unBalanceVertex) {
			arrayOfUnbalancedVertexes.push(unBalanceVertex);
		} else {
			break
		}
	}

	if (arrayOfUnbalancedVertexes.length > 0) {
		return arrayOfUnbalancedVertexes.reduce((min, curr) => curr.height < min.height ? curr : min)
	} else {
		return null
	}
}

