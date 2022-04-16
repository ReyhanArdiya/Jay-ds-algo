import DoublyLinkedList from "./doubly-linked-list.js";

class DoublyQueue extends DoublyLinkedList {
	dequeue() {
		return this.shift().data;
	}

	get first() {
		return this.head.data;
	}

	enqueue(data) {
		this.push(data);
	}
}

const queue = new DoublyQueue(1, 2);

queue.enqueue("meow");
console.log(queue.dequeue());

queue.traverse();

