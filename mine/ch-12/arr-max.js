const arrMax = arr => {
	if (arr.length === 2) {
		return arr[0] > arr[1] ? arr[0] : arr[1];
	}

	const highest = arrMax(arr.slice(1));
	return arr[0] > highest ? arr[0] : highest;
};

console.log(arrMax([2, 6, 3, 8]));
