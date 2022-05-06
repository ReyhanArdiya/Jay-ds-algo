class Heap {
	#data = [ 100, 88, 25, 87, 16, 8, 12, 86, 50, 2, 15, 3 ];

	get rootNode() {
		return this.#data[0];
	}

	get lastNode() {
		return this.#data[this.#data.length - 1];
	}

	printNodes() {
		for (const node of this.#data) {
			console.log(node);
		}
	}

	leftChildOfIndex(index, returnNode = true) {
		const nodeIndex = (index * 2) + 1;

		if (returnNode) {
			return this.#data[nodeIndex];
		}

		return nodeIndex;
	}

	rightChildOfIndex(index, returnNode = true) {
		const nodeIndex = (index * 2) + 2;

		if (returnNode) {
			return this.#data[nodeIndex];
		}

		return nodeIndex;
	}

	parentOfIndex(index, returnNode = true) {
		const nodeIndex = Math.floor((index - 1) / 2);

		if (returnNode) {
			return this.#data[nodeIndex];
		}

		return nodeIndex;
	}

	insert(value) {
		// The index of the new last_node value will ALWAYS be len of the array
		const latNodeIndex = this.#data.length;
	}
}