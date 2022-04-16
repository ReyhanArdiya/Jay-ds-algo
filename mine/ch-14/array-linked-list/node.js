class Node {
	#arr = null;

	constructor(val, next = null) {
		this.#arr = [ val, next ];
	}

	get node() {
		return this.#arr;
	}
}

export default Node;
