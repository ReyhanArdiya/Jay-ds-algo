import Queue from "../ch-9/queue.js";

class Vertex {
	/**
	 * @type {Vertex[]}
	 */
	adjacentVertices = [];

	constructor(value) {
		this.value = value;
	}

	addAdjacentVertex(vertex) {
		if (this.adjacentVertices.includes(vertex)) {
			return false;
		}

		this.adjacentVertices.push(vertex);

		vertex.addAdjacentVertex(this);
	}

	/**
	 *
	 * @param {Function} cb
	 *
	 * @param {Vertex} vertex
	 *
	 * @param {Map} visited
	 */
	traverseDFS(
		cb = vertex => console.log(vertex),
		vertex = this,
		visited = new Map()
	) {
		cb(vertex);

		visited.set(vertex, true);

		for (const neighbor of vertex.adjacentVertices) {
			if (!visited.has(neighbor)) {
				neighbor.traverseDFS(cb, neighbor, visited);
			}
		}
	}

	/**
	 *
	 * @param {any} searchVal
	 *
	 * @param {Vertex} vertex
	 *
	 * @param {Map} visited
	 */
	searchDFS(searchVal, vertex = this, visited = new Map()) {
		if (vertex.value === searchVal) {
			return vertex;
		}

		visited.set(vertex, true);

		for (const neighbor of vertex.adjacentVertices) {
			if (!visited.has(neighbor)) {
				if (neighbor.value === searchVal) {
					return neighbor;
				}

				const res = neighbor.searchDFS(searchVal, neighbor, visited);

				if (res instanceof Vertex) {
					return res;
				}
			}
		}

		return null;
	}

	/**
	 *
	 * @param {Function} cb
	 *
	 * @param {Vertex} startingVertex
	 *
	 * @param {Map} visited
	 *
	 * @param {Queue} queue
	 */
	traverseBFS(
		cb = vertex => console.log(vertex),
		startingVertex = this,
		visited = new Map(),
		queue = new Queue()
	) {
		visited.set(startingVertex, true);
		queue.enqueue(startingVertex);

		while (queue.first) {
			const currentVertex = queue.dequeue();

			cb(currentVertex);

			for (const neighbor of currentVertex.adjacentVertices) {
				if (!visited.has(neighbor)) {
					visited.set(neighbor);
					queue.enqueue(neighbor);
				}
			}
		}
	}

	/**
	 *
	 * @param {any} searchVal
	 *
	 * @param {Vertex} startingVertex
	 *
	 * @param {Map} visited
	 *
	 * @param {Queue} queue
	 */
	searchBFS(
		searchVal,
		startingVertex = this,
		visited = new Map(),
		queue = new Queue()
	) {
		if (startingVertex.value === searchVal) {
			return startingVertex;
		}

		visited.set(startingVertex, true);
		queue.enqueue(startingVertex);

		while (queue.first) {
			const currentVertex = queue.dequeue();

			for (const neighbor of currentVertex.adjacentVertices) {
				if (!visited.has(neighbor)) {
					if (neighbor.value === searchVal) {
						return neighbor;
					}

					visited.set(neighbor);
					queue.enqueue(neighbor);
				}
			}
		}

		return null;
	}
}

export default Vertex;

// const alice = new Vertex("alice");
// const bob = new Vertex("bob");
// const candy = new Vertex("candy");
// const derek = new Vertex("derek");
// const elaine = new Vertex("elaine");
// const fred = new Vertex("fred");
// const gina = new Vertex("gina");
// const helen = new Vertex("helen");
// const irena = new Vertex("irena");

// alice.addAdjacentVertex(bob);
// alice.addAdjacentVertex(candy);
// alice.addAdjacentVertex(derek);
// alice.addAdjacentVertex(elaine);

// bob.addAdjacentVertex(fred);

// candy.addAdjacentVertex(helen);

// derek.addAdjacentVertex(elaine);
// derek.addAdjacentVertex(gina);

// fred.addAdjacentVertex(helen);

// gina.addAdjacentVertex(irena);

// // console.log("===DFS===");
// // alice.traverseDFS(vertex => console.log(vertex.value));
// console.log(alice.searchDFS("helen").value);

// console.log("===BFS===");
// // alice.traverseBFS(vertex => console.log(vertex.value));
// alice.searchBFS("helen");
