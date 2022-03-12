const firstNonDup = str => {
	const charsCounter = {};
	for (const char of str) {
		if (!charsCounter[char]) {
			charsCounter[char] = 1;
		} else {
			charsCounter[char]++;
		}
	}

	for (const [char, count] of Object.entries(charsCounter)) {
		if (count === 1) {
			return char;
		}
	}

	// for (const char in charsCounter) {
	// 	if (charsCounter[char] === 1) {
	// 		return char;
	// 	}
	// }
};

console.log(firstNonDup("minimum"));
