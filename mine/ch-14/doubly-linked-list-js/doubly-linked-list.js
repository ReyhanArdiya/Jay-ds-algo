import DoublyNode from "./doubly-node.js";

class DoublyLinkedList {
	#head = null;
	#current = null;
	#tail = null;

	#resetCurrent() {
		this.#current = this.#head;
	}

	constructor(headData, tailData) {
		const headNode = new DoublyNode(headData);
		const tailNode = new DoublyNode(tailData);

		headNode.next = tailNode;
		tailNode.previous = headNode;

		this.#head = headNode;
		this.#current = this.#head;
		this.#tail = tailNode;
	}


	push(data) {
		const newNode = new DoublyNode(data);
		newNode.previous = this.#tail;
		this.#tail.next = newNode;
		this.#tail = newNode;
	}

	shift() {
		const removed = this.#head;
		this.#head = this.#head.next;
		this.#resetCurrent();
		return removed;
	}

	traverse(callback = node => console.log(node)) {
		callback(this.#current);

		if (!this.#current.next) {
			this.#resetCurrent();
			return;
		}

		this.#current = this.#current.next;
		this.traverse(callback);
	}

	reverse(callback = node => console.log(node), currentNode = this.#tail) {
		callback(currentNode);

		if (!currentNode.previous) {
			return;
		}

		this.reverse(callback, currentNode.previous);
	}

	printReverse() {
		this.reverse(({ data }) => console.log(data));
	}

	get head() {
		return this.#head;
	}
}

// [n,1,B] <-> [A, 2, n]

// const dll = new DoublyLinkedList(1, 2);
// dll.push(3);
// dll.push(4);
// dll.push(5);

// dll.printReverse();
// // dll.reverse(node => console.log(node.data));
// dll.traverse(node => console.log(node.data));

// dll.shift();
// dll.shift();
// console.log("Shift");

// dll.traverse(node => console.log(node.data));


// console.log(dll.head.next.previous.next.next.next.next.previous.data); // results into 4

export default DoublyLinkedList;
