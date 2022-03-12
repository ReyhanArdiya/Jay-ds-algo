const intersection = (arr1, arr2) => arr1.filter(i => arr2.includes(i));

const intersectionV2 = (arr1, arr2) => {
	const arr = arr1.concat(arr2);
	const encountered = [];
	const intersection = [];

	for (let i = 0; i < arr.length; i++) {
		if (encountered[arr[i]] === 1) {
			intersection.push(arr[i]);
		} else {
			encountered[arr[i]] = 1;
		}
	}

	return intersection;
};

console.log(intersectionV2([1, 3, 10], [2, 3, 1, 10]));
