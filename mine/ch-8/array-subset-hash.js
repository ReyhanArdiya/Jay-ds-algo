const arraySubsetHash = (arr1, arr2) => {
	let bigArr;
	let smallArr;

	if (arr1.length > arr2.length) {
		bigArr = arr1;
		smallArr = arr2;
	} else {
		bigArr = arr2;
		smallArr = arr1;
	}

	let hashTable = new Map();
	for (const val of bigArr) {
		hashTable.set(val, true);
	}

	for (const val of smallArr) {
		if (!hashTable.get(val)) {
			return false;
		}
	}

	return true;
};

console.log(arraySubsetHash([1, 2, 3], [1, 2, 3, 4]));
