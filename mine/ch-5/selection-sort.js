const selectionSort = arr => {
	let counter = 0;
	for (
		let startingIndex = 0;
		// Loop until BEFORE the last index
		startingIndex < arr.length - 1;
		startingIndex++
	) {
		counter++;
		/* The first lowest val's index on a new loop will always be the first value
		on the startingIndex */
		let lowestValIndex = startingIndex;

		// Search for the lowest value AFTER the startingIndex since the values BEFORE startingIndex has already been sorted
		for (let j = startingIndex + 1; j < arr.length; j++) {
			counter++;
			if (arr[lowestValIndex] > arr[j]) {
				lowestValIndex = j;
			}
		}

		/* Only switch if the new lowestVal's index is different from the
		 starting index since there is a possibility that the lowest val
		 is already at the starting index */
		if (startingIndex !== lowestValIndex) {
			const startingVal = arr[startingIndex];
			arr[startingIndex] = arr[lowestValIndex];
			arr[lowestValIndex] = startingVal;
		}
	}
	setTimeout(() => console.log("Steps taken: " + counter), 0);
	return arr;
};

// selectionSort([100, 2000, 3, 4000, 5, 6]);
// console.log(selectionSort([4, 2, 7, 1, 3]));
console.log(
	selectionSort([
		36, 19, 28, 21, 22, 42, 49, 16, 1, 16, 48, 14, 20, 34, 7, 9, 27, 45, 45,
		5, 44, 46, 10, 41, 16, 19, 4, 19, 25, 20, 37, 44, 34, 19, 24, 6, 11, 1,
		21, 48, 10, 4, 31, 35, 30, 32, 37, 8, 34, 7
	])
);

// /**
//  * @param {number[]} nums
//  * @param {number} val
//  * @return {number}
//  */
// var removeElement = function (nums, val) {
// 	nums.forEach((num, i, arr) => {
// 		if (num === val) {
// 			arr[i] = null;
// 		}
// 	});
// 	nums.sort((a, b) => a - b);

// 	let deleteCount = 0;
// 	nums.some(val => {
// 		if (typeof val !== "number") {
// 			deleteCount++;
// 		} else if (typeof val === "number") {
// 			return true;
// 		}
// 	});

// 	nums.splice(0, deleteCount);
// };

// const nums = [1, 1, 2, 2, 3, 3, 1, 2, 1, 3, 1, 1, 1];
// console.log(nums);
// removeElement(nums, 1);
// console.log(nums);
