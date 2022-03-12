const findMissingAlpha = str => {
	// const alphas = {
	// 	A: true,
	// 	B: true,
	// 	C: true,
	// 	D: true,
	// 	E: true,
	// 	F: true,
	// 	G: true,
	// 	H: true,
	// 	I: true,
	// 	J: true,
	// 	K: true,
	// 	L: true,
	// 	M: true,
	// 	N: true,
	// 	O: true,
	// 	P: true,
	// 	Q: true,
	// 	R: true,
	// 	S: true,
	// 	T: true,
	// 	U: true,
	// 	V: true,
	// 	W: true,
	// 	X: true,
	// 	Y: true,
	// 	Z: true
	// };

	// for (const char of str) {
	// 	delete alphas[char.toUpperCase()];
	// }

	// for (const key in alphas) {
	// 	return key;
	// }

	const hash = {};
	for (const val of str) {
		hash[val] = true;
	}

	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	for (const alpa of alphabet) {
		if (!hash[alpa]) {
			return alpa;
		}
	}
};

console.log(findMissingAlpha("the quick brown box jumps over a lazy dog"));
