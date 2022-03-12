const arraySubset = (arr1, arr2) => {
	arr2 = arr1.length >= arr2.length ? arr2 : arr1;
	return arr2.every(num => arr1.includes(num));
};

const arraySubsetV2 = (arr1, arr2) => {
	arr2 = arr1.length >= arr2.length ? arr2 : arr1;

	for (const el2 of arr2) {
		let included = false;

		for (const el1 of arr1) {
			if (el1 === el2) {
				included = true;
				break;
			}
		}

		if (!included) {
			return false;
		}
	}

	return true;
};

console.log(arraySubset([1, 2, 3], [2, 3, 4]));
console.log(arraySubsetV2([1, 2, 3], [2, 3, 4]));
