/**
 * @param {string[]} strs
 *
 *
 * @returns {string}
 */
const longestCommonSubStr = strs => {
	let [ shortestStr ] = strs;
	for (const str of strs) {
		if (str.length < shortestStr.length) {
			shortestStr = str;
		}
	}

	let longestSubStr;
	if (strs.every(str => str.includes(shortestStr))) {
		longestSubStr = shortestStr;

		return longestSubStr;
	}

	longestSubStr = "";

	for (let i = shortestStr.length - 1; i >= 0; i--) {
		const slicedStr = shortestStr.slice(0, i);

		let currentSubStr;
		if (strs.every(str => str.includes(slicedStr))) {
			currentSubStr = slicedStr;
		}

		if (currentSubStr && currentSubStr.length > longestSubStr.length) {
			longestSubStr = currentSubStr;
		}
	}

	for (let i = 0; i < shortestStr.length; i++) {
		const slicedStr = shortestStr.slice(i);

		let currentSubStr;
		if (strs.every(str => str.includes(slicedStr))) {
			currentSubStr = slicedStr;
		}

		if (currentSubStr && currentSubStr.length > longestSubStr.length) {
			longestSubStr = currentSubStr;
		}
	}

	return longestSubStr;
};

/**
 * @param {string[]} strs
 *
 *
 * @returns {string}
 */
const longestCommonPrefix = strs => {
	let [ shortestStr ] = strs;
	for (const str of strs) {
		if (str.length < shortestStr.length) {
			shortestStr = str;
		}
	}

	let longestPrefix;
	if (strs.every(str => str.startsWith(shortestStr))) {
		longestPrefix = shortestStr;

		return longestPrefix;
	}

	longestPrefix = "";

	for (let i = shortestStr.length - 1; i >= 0; i--) {
		const slicedStr = shortestStr.slice(0, i);

		let currentSubStr;
		if (strs.every(str => str.startsWith(slicedStr))) {
			currentSubStr = slicedStr;
		}

		if (currentSubStr && currentSubStr.length > longestPrefix.length) {
			longestPrefix = currentSubStr;
		}
	}

	for (let i = 0; i < shortestStr.length; i++) {
		const slicedStr = shortestStr.slice(i);

		let currentSubStr;
		if (strs.every(str => str.startsWith(slicedStr))) {
			currentSubStr = slicedStr;
		}

		if (currentSubStr && currentSubStr.length > longestPrefix.length) {
			longestPrefix = currentSubStr;
		}
	}

	return longestPrefix;
};

console.log(longestCommonPrefix([ "flower", "flow", "flight" ]));
console.log(longestCommonPrefix([ "dog", "racecar", "car" ]));
// console.log(longestCommonPrefix());