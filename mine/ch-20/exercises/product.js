/**
 * time O(N)
 *
 * space O(1)
 *
 * @param {number[]} arr
 */
const product = arr => {
	let firstLowestNeg = 0;
	let secondLowestNeg = 0;
	let firstHighestPos = 0;
	let secondHighestPos = 0;

	for (const num of arr) {
		if (num < firstLowestNeg) {
			firstLowestNeg = num;
		} else if (num < secondLowestNeg) {
			secondLowestNeg = num;
		} else if (num > firstHighestPos) {
			secondHighestPos = firstHighestPos;
			firstHighestPos = num;
		}
	}

	const negProduct = secondLowestNeg * firstLowestNeg;
	const posProduct = secondHighestPos * firstHighestPos;

	// CMT To handle edge cases like [1, -10]
	if (negProduct || posProduct) {
		return negProduct > posProduct ? negProduct : posProduct;
	} else {
		return firstLowestNeg * firstHighestPos;
	}
};

const arr1 = [ -9, -4, -3, 0, 6, 7 ];
const arr2 = [ 1, -10 ];


console.log(product(arr1));
console.log(product(arr2));
