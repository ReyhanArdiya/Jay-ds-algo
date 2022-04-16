import Node from "./node.js";

class LinkedList {
	#head = null;
	#tail = null;
	#current = null;

	constructor(initVal) {
		const node = new Node(initVal);
		this.#head = node;
		this.#tail = node;
		this.#current = node;
	}

	add(val) {
		const node = new Node(val);
		this.#tail.node[1] = node;
		this.#tail = node;
	}

	get list() {
		return this.#head;
	}

	get tail() {
		return this.#tail;
	}

	/**
	 *
	 * @param {(val: any) => void} callback
	 */
	traverse(callback = val => console.log(val)) {
		callback(this.#current.node[0]);

		if (!this.#current.node[1]) {
			this.#current = this.#head;
			return;
		}

		this.#current = this.#current.node[1];
		this.traverse(callback);
	}

	printNodes() {
		console.log(this.#current.node);

		if (!this.#current.node[1]) {
			this.#current = this.#head;
			return;
		}

		this.#current = this.#current.node[1];
		this.printNodes();
	}
}

const list = new LinkedList(1);
// console.log(list.list.node);
// console.log(list.tail.node);

list.add(2);

// console.log(list.list.node);
// console.log(list.tail.node);

list.add(3);

// console.log(list.list.node);
// console.log(list.tail.node);

list.add(4);
list.add("Y");
list.add("A");
list.add("S");
list.add("S");
list.add("Q");
list.add("U");
list.add("E");
list.add("E");
list.add("N");
list.add("W");
list.add("A");
list.add("T");
list.add("T");

// console.log(list.list.node);
// console.log(list.tail.node);

list.traverse();
// list.printNodes();
