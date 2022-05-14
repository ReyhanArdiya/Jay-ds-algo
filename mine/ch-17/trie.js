class TrieNode {

}

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
}

const trie1 = new Trie();

trie1.insert("ace");
trie1.insert("act");
trie1.insert("acne");
trie1.insert("bat");
trie1.insert("batter");
trie1.insert("girl of the year beach house");
// console.log(trie1.root);
// console.log(trie1.searchSub("ace"));
// console.log(trie1.searchSub("act"));
// console.log(trie1.searchSub("acne"));
// console.log(trie1.searchSub("bat"));
// console.log(trie1.searchSub("batter"));
// console.log(trie1.collectAllWords());
// console.log(trie1.collectAllWords(trie1.searchSub("bat")));
console.log(trie1.autoComplete("The Hours", true));
console.log(trie1.autoComplete("The "));