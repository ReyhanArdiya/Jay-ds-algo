// O(N2)
let counter = 0;
const checkDups = arr =>
	arr.some((val, i, arr) => {
		counter += arr.length;
		return arr.indexOf(val) !== i;
	});

// console.log(checkDups([1, 4, 5, 2, 9, 11, 293, 283204, 18, 3289293]));
// console.log(counter);

//  O(N)
const checkDupsLin = arr => {
	const dups = new Set();
	arr.forEach(val => {
		dups.push(val);
		if (dups.has(val)) {
			return true;
		}
	});
	return false;
};

function hasDuplicateValue(array) {
	let steps = 0;
	let existingNumbers = [];
	for (let i = 0; i < array.length; i++) {
		steps++;
		if (existingNumbers[array[i]] === 1) {
			return true;
		} else {
			existingNumbers[array[i]] = 1;
		}
	}
	console.log(steps);
	return false;
}
hasDuplicateValue([1, 4, 5, 2, 9]);
