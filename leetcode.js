/**
 * @param {number[]} nums
 *
 * @param {number} target
 *
 * @returns {number}
 */
const search = function(nums, target) {
	let leftBind = 0;
	let rightBind = nums.length - 1;

	while (leftBind <= rightBind) {
		const i = Math.floor((rightBind + leftBind) / 2);
		const current = nums[i];

		if (current < target) {
			leftBind = i + 1;
		} else if (current > target) {
			rightBind = i - 1;
		} else {
			return i;
		}

	}

	return -1;
};

console.log(search([ -1, 0, 3, 5, 9, 12 ], 12));
console.log(search([ 5 ], 5));