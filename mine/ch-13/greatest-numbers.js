/**
 *
 * @param {number[]} arr
 */
const greatestNumberQuadraticTime = arr => {
	let greatest;

	for (const currentNum of arr) {
		console.log("Quadratic!");
		let greatestInLoop = currentNum;

		for (const otherNum of arr) {
			console.log("Quadratic!");
			if (otherNum > greatestInLoop) {
				greatestInLoop = otherNum;
			}
		}

		greatest = greatestInLoop;
	}

	return greatest;
};

/**
 *
 * @param {number[]} arr
 */
const greatestNumberLinearithmicTime = arr => {
	// Assume that .sort is O(N log N)
	arr.sort((a, b) => console.log("Linearithmic!") || a - b);

	return arr[arr.length - 1];
};

/**
 *
 * @param {number[]} arr
 */
const greatestNumberLinearTime = arr => {
	let greatestSoFar = arr[0];

	for (const num of arr) {
		console.log("Linear!");
		if (num > greatestSoFar) {
			greatestSoFar = num;
		}
	}

	return greatestSoFar;
};

const array = [45, 3, 43, 4];
console.log(`Array length: ${array.length}`);
console.log(greatestNumberQuadraticTime(array));
console.log(greatestNumberLinearithmicTime(array));
console.log(greatestNumberLinearTime(array));
