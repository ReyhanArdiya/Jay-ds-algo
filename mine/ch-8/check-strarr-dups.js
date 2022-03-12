const checkStrArrDups = strArr => {
	let counter = 0;
	const dups = {};

	for (const str of strArr) {
		counter++;
		if (!dups[str]) {
			dups[str] = true;
		} else {
			console.log(counter);
			return str;
		}
	}

	console.log(counter);
};

console.log(checkStrArrDups(["a", "b", "c", "d", "z", "e", "f"]));
