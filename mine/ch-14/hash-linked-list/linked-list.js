// Therse a lot of recursions here, but Im happy that i am able to do it :)
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

	add(data) {
		const node = new Node(data);
		this.#tail.link = node;
		this.#tail = node;

		return node;
	}

	get head() {
		return this.#head;
	}

	get tail() {
		return this.#tail;
	}

	get end() {
		return this.#tail.data;
	}

	endNoTail(currentNode = this.#head) {
		if (!currentNode.link) {
			// console.log(currentNode);
			return currentNode.data;
		}

		return this.endNoTail(currentNode.link);
	}

	/**
	 *
	 * @param {(data: any) => void} callback
	 */
	traverse(callback = data => console.log(data)) {
		callback(this.#current.data);

		if (!this.#current.link) {
			this.#current = this.#head;
			return;
		}

		this.#current = this.#current.link;
		this.traverse(callback);
	}

	/**
	 * We can either add value or addNode. The benefit of using addNode is that
	 * we can create a node in a variable then add it through here and then we pass in
	 * that node as a second param to {@link traverseMemo} so that we can traverse
	 * this LinkedList STARTING FROM that node.
	 *
	 * @param {Node} node
	 *
	 * @example
	 * ```js
	 * const list = new LinkedList(1);
	 * list.add(2);
	 * list.add(3);
	 * list.add(4);
	 * list.add("Y");
	 * list.add("A");
	 * list.add("S");
	 * list.add("S");
	 * list.add("Q");
	 * const uNode = new Node("U");
	 * list.addNode(uNode);
	 * list.add("E");
	 * list.add("E");
	 * list.add("N");
	 * list.add("W");
	 * list.add("A");
	 * list.add("T");
	 * list.add("T");
	 *
	 * list.traverse(); // Starts from 1
	 * list.traverseMemo(undefined, uNode); // Starts from "U"
	 * ```
	 */
	addNode(node) {
		this.#tail.link = node;
		this.#tail = node;
	}

	traverseMemo(callback = data => console.log(data), memo = this.#head) {
		callback(memo.data);

		if (!memo.link) {
			return;
		}

		this.traverseMemo(callback, memo.link);
	}

	printNodes() {
		console.log(this.#current);

		if (!this.#current.link) {
			this.#current = this.#head;
			return;
		}

		this.#current = this.#current.link;
		this.printNodes();
	}

	readVal(index, position = 0) {
		return this.readNode(index, position).data;
	}

	readNode(index, position = 0) {
		if (index === position) {
			const temp = this.#current;
			// We need to reset current again for future functions
			this.#current = this.head;
			return temp;
		}

		this.#current = this.#current.link;
		return this.readNode(index, position + 1);
	}

	indexOf(value, position = 0) {
		if (value === this.#current.data) {
			this.#current = this.head;
			return position;
		}

		this.#current = this.#current.link;
		return this.indexOf(value, position + 1);
	}

	prepend(val) {
		const newHead = new Node(val);
		newHead.link = this.#head;
		this.#head = newHead;
		this.#current = newHead;

		return newHead;
	}

	insertAfter(index, val) {
		const newNode = new Node(val);
		const toBeInsertedNode = this.readNode(index);
		const newNodeLink = toBeInsertedNode.link;

		newNode.link = newNodeLink;
		toBeInsertedNode.link = newNode;

		return newNode;
	}

	insertOn(index, val) {
		if (!index) {
			return this.prepend(val);
		}

		const newNode = new Node(val);
		const toBeInsertedNode = this.readNode(index - 1);

		newNode.link = toBeInsertedNode.link;
		toBeInsertedNode.link = newNode;

		return newNode;
	}

	deleteAt(index) {
		if (index === 0) {
			this.#head = this.#head.link;
			this.#current = this.#head;
			return;
		}

		const beforeDeletedNode = this.readNode(index - 1);

		// Opt 1
		// const toBeDeletedNode = beforeDeletedNode.link;
		// beforeDeletedNode.link = toBeDeletedNode.link;
		// return toBeDeletedNode;

		// Opt 2
		beforeDeletedNode.link = beforeDeletedNode.link.link;
	}

	reverse(
		first = this.#head,
		second = this.#head.link,
		third = second.link
	) {
		second.link = first;

		if (!third) {
			this.#head.link = null;
			this.#head = second;
			this.#current = this.#head;
			return;
		}

		this.reverse(second, third, third.link);
	}

	reverseV2(
		previous = null,
		current = this.#head,
		next = current.link,
	) {
		current.link = previous;

		if (!next) {
			// Head is now the last node
			this.#head = current;
			this.#current = this.#head;
			return;
		}

		this.reverseV2(current, next);
	}

	/*
	The way we delete without having access to the LinkedList instace but only the Node
	instance is by copying the next Node data & link to the to be deleted node which
	causes the to be deleted node to refer to the node after the next node which causes
	it to "skip" the next node and since next node is inaccessible its going to be deleted so
	we are effectively deleting it. Really interesting
	*/
	static deleteNodeWithoutInstance(node) {
		// Opt 1
		// node.data = node.link;

		// Opt 2
		// node.data = null;
		// node.link = null;

		// Opt 3
		const next = node.link;
		node.data = next.data;
		node.link = next.link;
		// next.link
	}
}

// const list = new LinkedList(1);
// list.add(2);
// list.add(3);
// // list.insertAfter(0, 2);
// // list.insertAfter(1, 3);
// // list.insertAfter(0, 4);
// // list.prepend(0);
// // list.prepend(-1);

// // list.insertOn(1, "meow");
// list.deleteAt(1);

// // list.printNodes();
// list.traverse(data => console.log(data));
// console.log(list.head);
// console.log(list.readNode(1));

// console.log(list.list.node);
// console.log(list.tail.node);

// console.log(list.list.node);
// console.log(list.tail.node);

// console.log(list.list.node);
// console.log(list.tail.node);

const list = new LinkedList(1);
list.add(2);
const tNode = new Node(3);
list.addNode(tNode);
list.add(4);
list.add("Y");
list.add("A");
// list.add("S");
list.add("S");
list.add("S");
list.add("Q");
const uNode = new Node("U");
list.addNode(uNode);
list.add("E");
list.add("E");
list.add("N");
list.add("W");
list.add("A");
list.add("T");

// console.log(list.endNoTail());
// list.add("T");

list.traverse();
LinkedList.deleteNodeWithoutInstance(uNode);
console.log("Delete U");
list.traverse();
LinkedList.deleteNodeWithoutInstance(tNode);
console.log("Delete 3");
list.traverse();

// console.log("V1");
// list.traverse();
// console.log("reverse");
// list.reverse();
// list.traverse();
// console.log("reverse");
// list.reverse();
// list.traverse();

// console.log("V2");
// list.traverse();
// console.log("reverse");
// list.reverseV2();
// // LinkedList.deleteNodeWithoutInstance(uNode);
// list.traverse();
// console.log("reverse");
// list.reverseV2();
// list.traverse();


// console.log("reverse");
// list.reverse();
// list.traverse();
// console.log("reverse");
// list.reverse();
// list.traverse();
// console.log(list.read(0));
// console.log(list.read(1));
// console.log(list.read(2));
// console.log(list.read(3));

// console.log(list.indexOf(4));
// list.traverseMemo(undefined, uNode);

// console.log(list.list.node);
// console.log(list.tail.node);
// console.log(list.head);
// console.log(list.tail);
// list.printNodes();

// [] -> [] -> [] -> []
