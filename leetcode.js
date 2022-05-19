/**
 * @param {number[]} nums
 *
 * @param {number} target
 *
 * @returns {number}
 */
const searchInsert = (nums, target) => {
	let leftBind = 0;
	let rightBind = nums.length - 1;

	let i = Math.floor((rightBind + leftBind) / 2);
	let current = nums[i];
	while (leftBind <= rightBind) {
		i = Math.floor((rightBind + leftBind) / 2);
		current = nums[i];

		if (current > target) {
			rightBind = i - 1;
		} else if (current < target) {
			leftBind = i + 1;
		} else {
			return i;
		}
	}

	i = current > target ? i - 1 : i + 1;

	return i < 0 ? 0 : i;
};

searchInsert([ 1, 3 ], 2);