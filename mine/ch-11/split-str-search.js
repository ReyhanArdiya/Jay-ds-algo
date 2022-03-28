const halveStr = str => {
	const splittedStr = str.split(" ");

	if (splittedStr.length > 1) {
		const half = Math.ceil(splittedStr.length / 2);
		return [
			splittedStr.slice(0, half).join(" "),
			splittedStr.slice(half).join(" ")
		];
	}

	return [str];
};

// ["The hours", "Beach house"] => ["The", "hours", "Beach", "House"]
const halveStrArr = strArr => {
	const halvedStrArr = strArr.flatMap(str => halveStr(str));

	return halvedStrArr.every((str, i) => str === strArr[i])
		? false
		: halvedStrArr;
};

// The user will send a string for the str arg but later in the recursion call it will be an array of the spltited str
// except for the first item. I know this is weird, the alternative would be to
// split the str only in each recursion and implement a way to slice the str
// on the first space to be sent to the next recursion call. I choose the former
// since I don't have to spend time to split the string and use the slice logic
// for every recursion call which should save me some time complexity.
const splitStrSearch = (str, q) => {
	// The str that will be searched splitted into an array
	const seperatedStr = str instanceof Array ? str : str.split(" ");

	// The base case will be when the str is an empty array which means we don't have to match anything and just return 0
	if (!str.length) {
		return 0;
	}

	let matchCount = 0;
	// The query being halved until it's no longer possible to halve it
	let halvedQ = [q];
	while (halvedQ) {
		// Match seperatedStr[0] (which is the only str value we need to care per recursion) againts each query
		for (const query of halvedQ) {
			seperatedStr[0].toLowerCase().includes(query.toLowerCase()) &&
				matchCount++;
		}

		// Halve the q
		halvedQ = halveStrArr(halvedQ);
	}

	// Return seperatedStr[0] matchCount with the rest of the seperatedStr matchCounts (which is the subproblem of this recursion problem)
	return matchCount + splitStrSearch(seperatedStr.slice(1), q);
};

console.log(
	splitStrSearch("The hours beach house bloom", "Beach The Bloom Hours House")
); // 8

console.log(
	splitStrSearch("The golden hours of Carcosa", "Beach The Bloom Hours House")
); // 3

console.log(splitStrSearch("The hours the", "the")); // 2

export default splitStrSearch;
