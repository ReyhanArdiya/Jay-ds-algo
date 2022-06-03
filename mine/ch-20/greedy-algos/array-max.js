/**
 * # time O(N)
 * ## space O(1)
 *
 * @param {number[]} arr
 *
 * @returns
 */
const arrayMaxLinear = arr => {
	let [ biggest ] = arr;

	for (const num of arr) {
		if (num > biggest) {
			biggest = num;
		}
	}

	return biggest;
};

const arrayMaxQuadratic = arr => {
	for (let i = 0; i < arr.length; i++) {
		let isBiggest = true;

		for (let j = 0; j < arr.length; j++) {
			if (i !== j && arr[j] > arr[i]) {
				isBiggest = false;
			}
		}

		if (isBiggest) {
			return arr[i];
		}
	}
};

const arr = [
	1,
	35,
	43,
	23,
	6,
	734,
	34,
	634,
	345634,
	634,
	634,
	643,
	224,
	2,
	14,
	64,
	2,
	5242342,
	134,
	3,
	1,
	3,
	56,
	5,
	36
];

console.log(arrayMaxLinear(arr));

console.log(arrayMaxQuadratic(arr));
