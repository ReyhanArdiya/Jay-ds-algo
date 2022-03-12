const arrayIntersection = (arr1, arr2) => {
	let counter = 0;

	let largeArr;
	let smallArr;
	if (arr1.length > arr2.length) {
		largeArr = arr1;
		smallArr = arr2;
	} else {
		largeArr = arr2;
		smallArr = arr1;
	}

	const hash = {};
	for (const val of largeArr) {
		counter++;
		hash[val] = true;
	}

	const intersection = [];
	for (const val of smallArr) {
		counter++;
		hash[val] && intersection.push(val);
	}

	console.log(counter);
	return intersection;
};

console.log(arrayIntersection([1, 2, 3, 4, 5, 7], [0, 2, 4, 6, 8]));
