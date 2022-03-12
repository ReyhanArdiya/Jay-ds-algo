// My implemention of set using hash table for O(1) searches most of the time
class HashSet {
	#items = {};

	constructor(...items) {
		for (const item of items) {
			this.#items[item] = true;
		}
	}

	add(item) {
		if (this.#items[item]) {
			return false;
		} else {
			this.#items[item] = true;
			return true;
		}
	}

	delete(item) {
		delete this.#items[item];
	}

	get items() {
		return { ...this.#items };
	}
}

console.time("set");
const set = new HashSet(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
console.log(set);
console.timeEnd("set");
