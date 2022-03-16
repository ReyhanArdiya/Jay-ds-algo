import Queue from "./queue.js";

class PrintManager {
	#printQueue = new Queue();

	order(item) {
		return this.#printQueue.enqueue(item);
	}

	printOne() {
		return this.#printQueue.dequeue();
	}

	printAll() {
		while (this.#printQueue.first) {
			console.log(this.#printQueue.dequeue());
		}
	}

	get first() {
		return this.#printQueue.first;
	}
}

const printManager = new PrintManager();
printManager.order("Henlo");
printManager.order("I am");
printManager.order("Hooman");
printManager.order("too");
// console.log(printManager.printOne());
printManager.printAll();
