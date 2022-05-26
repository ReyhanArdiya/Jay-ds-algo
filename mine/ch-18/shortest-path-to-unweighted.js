import Queue from "../ch-9/queue.js";
import Vertex from "./vertex.js";

/**
 *
 * @param {import("./vertex.js").default} startingV
 *
 * @param {import("./vertex.js").default} finalV
 */
const shortestPathToUnweighted = (startingV, finalV) => {
	const visited = new Map();
	const queue = new Queue();

	const shortestPreviousStopoverVertexTable = new Map();

	visited.set(startingV, true);
	queue.enqueue(startingV);

	let found = false;
	while (!found && queue.first) {
		const currentV = queue.dequeue();

		for (const neighbor of currentV.adjacentVertices) {
			if (!visited.has(neighbor)) {
				visited.set(neighbor);
				queue.enqueue(neighbor);
				shortestPreviousStopoverVertexTable.set(neighbor, currentV);

				if (neighbor === finalV) {
					found = true;
					break;
				}
			}
		}
	}

	const paths = [ finalV.value ];

	let prevV = shortestPreviousStopoverVertexTable.get(finalV);
	while (prevV) {
		paths.push(prevV.value);
		prevV = shortestPreviousStopoverVertexTable.get(prevV);
	}

	return paths.reverse();
};

const idris = new Vertex("idris");
const kamil = new Vertex("kamil");
const talia = new Vertex("talia");
const lina = new Vertex("lina");
const ken = new Vertex("ken");
const marco = new Vertex("marco");
const sasha = new Vertex("sasha");

idris.addAdjacentVertex(kamil);
idris.addAdjacentVertex(talia);

kamil.addAdjacentVertex(lina);

talia.addAdjacentVertex(ken);

ken.addAdjacentVertex(marco);

marco.addAdjacentVertex(sasha);

sasha.addAdjacentVertex(lina);

console.log(shortestPathToUnweighted(idris, lina));
console.log(shortestPathToUnweighted(idris, kamil));
console.log(shortestPathToUnweighted(idris, sasha));
console.log(shortestPathToUnweighted(ken, lina));
console.log(shortestPathToUnweighted(lina, talia));
console.log(shortestPathToUnweighted(talia, lina));