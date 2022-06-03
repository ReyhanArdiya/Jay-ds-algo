/* eslint-disable prefer-const */

const largestSubsectionSumV1 = arr => {
	/*
    time: O(N * M) because in each loop, i have to loop the rest of the array
    space: O(N) roughly linear where N is the number that can get into subsection mainly
    */
	let [ largestSum ] = arr;

	for (let i = 0; i < arr.length - 1; i++) {
		const subsection = [ arr[i] ];
		let subsectionSum = subsection.reduce((a, b) => a + b);

		for (let j = i + 1; j < arr.length; j++) {
			if (subsectionSum + arr[j] < 0) {
				break;
			}

			subsection.push(arr[j]);
			subsectionSum = subsectionSum + arr[j];
		}

		largestSum = subsectionSum > largestSum ? subsectionSum : largestSum;
	}

	return largestSum;
};

const largestSubsectionSumLinear = arr => {
	let [ largestSum ] = arr;
	let sumSoFar = largestSum;

	for (let i = 1; i < arr.length; i++) {
		if (sumSoFar + arr[i] < 0) {
			sumSoFar = 0;
		} else {
			sumSoFar += arr[i];
		}

		if (sumSoFar > largestSum) {
			largestSum = sumSoFar;
		}
	}

	return largestSum;
};

const arr1 = [ 3, -4, 4, -3, 5, -9 ];
const arr2 = [ 1, 1, 0, -3, 5 ];
const arr3 = [ 5, -2, 3, -8, 4 ];
const arr4 = [ 2, -3, 1, 2, -1 ];
const arr5 = [ 5, -8, 2, 1, 0 ];

// console.log(largestSubsectionSumV1(arr1));
console.log(largestSubsectionSumLinear(arr1));

// console.log(largestSubsectionSumV1(arr2));
console.log(largestSubsectionSumLinear(arr2));

// console.log(largestSubsectionSumV1(arr3));
console.log(largestSubsectionSumLinear(arr3));

// console.log(largestSubsectionSumV1(arr4));
console.log(largestSubsectionSumLinear(arr4));

// console.log(largestSubsectionSumV1(arr5));
console.log(largestSubsectionSumLinear(arr5));