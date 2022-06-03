/**
 *
 * @param {number[]} numArr
 */
const longestConsecSeq = numArr => {
	let [ lowest ] = numArr;
	let [ highest ] = numArr;
	const numTable = {};

	for (const num of numArr) {
		if (num < lowest) {
			lowest = num;
		} else if (num > highest) {
			highest = num;
		}

		numTable[num] = true;
	}

	let longestSeqLen = 0;
	let currentSeqLen = 0;
	while (lowest <= highest) {
		if (numTable[lowest]) {
			currentSeqLen++;
		} else {
			currentSeqLen = 0;
		}

		if (currentSeqLen > longestSeqLen) {
			longestSeqLen = currentSeqLen;
		}
		lowest++;
	}

	return longestSeqLen;
};

const arr1 = [ 10, 5, 12, 3, 55, 30, 4, 11, 2 ];
const arr2 = [ 19, 13, 15, 12, 18, 14, 17, 11 ];
const arr3 = [ 1, 2, 8, 3 ];

console.log(longestConsecSeq(arr1));
console.log(longestConsecSeq(arr2));
console.log(longestConsecSeq(arr3));