class Queue {
	#arr;

	/**
	 * We can pass a list of stuff of make a new Queue from another Queue
	 * @param  {...any | Queue} items
	 */
	constructor(...items) {
		if (items[0] instanceof Queue) {
			// Remember that you can access another objects' private fields if you pass the object as an
			// argument to a class method which allows the method to access that object's private fields
			this.#arr = items[0].#arr;
		} else {
			this.#arr = items;
		}
	}

	enqueue(item) {
		return this.#arr.push(item);
	}

	dequeue() {
		return this.#arr.shift();
	}

	// get entries() {
	// 	return [...this.#arr];
	// }

	get first() {
		return this.#arr[0];
	}
}

// const queue = new Queue(1, 2, 3);
// console.log(queue.enqueue("meow"));
// console.log(queue.first);
// queue.dequeue();

export default Queue;
