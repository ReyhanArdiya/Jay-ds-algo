class TrieNode {}

class Trie {
	#root = new TrieNode();

	/**
	 *
	 * @param {string} str
	 */
	searchSub(str) {
		let currentNode = this.#root;

		for (const char of str) {
			const child = currentNode[char];

			if (child) {
				currentNode = child;
			} else {
				return null;
			}
		}

		return currentNode;
	}

	/**
	 *
	 * @param {string} str
	 */
	insert(str) {
		let currentNode = this.#root;

		for (const char of str) {
			const child = currentNode[char];

			if (child) {
				currentNode = child;
			} else {
				const newNode = new TrieNode();
				currentNode[char] = newNode;

				currentNode = newNode;
			}
		}

		currentNode["*"] = null;
	}

	get root() {
		return this.#root;
	}

	collectAllWords(node = this.#root, word = "", words = []) {
		for (const [ char, child ] of Object.entries(node)) {
			if (char !== "*") {
				this.collectAllWords(child, word + char, words);
			} else {
				words.push(word);
			}
		}

		return words;
	}

	autoComplete(prefix, addIfNull = false) {
		const node = this.searchSub(prefix);

		if (node) {
			return this.collectAllWords(node);
		}

		if (addIfNull) {
			this.insert(prefix);
		}

		return null;
	}

	autocorrect(
		prefix
		// node = this.#root
	) {
		const res = this.searchSub(prefix);

		// If we found it
		if (res && res["*"] !== undefined) {
			return prefix;
		}

		for (let i = prefix.length; i >= 0; i--) {
			const slicedPrefix = prefix.slice(0, i);
			const longestPrefix = this.searchSub(slicedPrefix);

			if (longestPrefix) {
				return this.collectAllWords(longestPrefix).map(
					suffix => slicedPrefix + suffix
				);
			}
		}
	}

	autocorrectJay(word, one = true) {
		let currentNode = this.#root;
		let wordFoundSoFar = "";

		for (const char of word) {
			if (currentNode[char]) {
				wordFoundSoFar += char;
				currentNode = currentNode[char];
			} else {
				return one ?
					wordFoundSoFar + this.collectAllWords(currentNode)[0] :
					this.collectAllWords(currentNode).map(
						suffix => wordFoundSoFar + suffix
					);
			}
		}

		return word;
	}

	traverse(
		node = this.#root,
		cb = node => {
			for (const key of Object.keys(node)) {
				console.log(key);
			}
		}
	) {
		if (!node) {
			return;
		}

		cb(node);

		for (const child of Object.values(node)) {
			this.traverse(child, cb);
		}
	}

	traverseJay(node = this.#root) {
		for (const [ key, child ] of Object.entries(node)) {
			console.log(key);
			if (key !== "*") {
				this.traverseJay(child);
			}
		}
	}
}

const trie1 = new Trie();

trie1.insert("tag");
trie1.insert("tank");
trie1.insert("tap");
trie1.insert("today");
trie1.insert("total");
trie1.insert("well");
trie1.insert("went");
trie1.insert("cat");
trie1.insert("catnap");
trie1.insert("catnip");
trie1.insert("catnap");

console.log(trie1.autocorrect("catnar"));
console.log(trie1.autocorrectJay("catnar"));

console.log(trie1.autocorrect("caxasfdij"));
console.log(trie1.autocorrectJay("caxasfdij"));
