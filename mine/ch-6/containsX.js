function containsX(string) {
	foundX = false;
	for (let i = 0; i < string.length; i++) {
		if (string[i] === "X") {
			foundX = true;
		}
	}
	return foundX;
}

/**
 * In a worst case it needs to check every item so that would be O(N) where N = str.length,
 * in an average case for example the X is in the middle then it would take somewhere
 * between O(1) and O(N)
 * In a best case where the X is the first item it would take O(1)
 *
 * @param {string} str
 */
const containsXV2 = str => {
	let counter = 0;
	foundX = false;

	for (let i = 0; i < str.length; i++) {
		counter++;
		if (str[i] === "X") {
			console.log(counter);
			return true;
		}
	}

	return false;
};

console.log(containsXV2("Xor"));
