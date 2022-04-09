const halveStr = str => {
	const splittedStr = str.split(" ");

	if (splittedStr.length > 1) {
		const half = Math.ceil(splittedStr.length / 2);
		return [
			splittedStr.slice(0, half).join(" "),
			splittedStr.slice(half).join(" ")
		];
	}

	return [ str ];
};

// ["The hours", "Beach house"] => ["The", "hours", "Beach", "House"]
const halveStrArr = strArr => {
	const halvedStrArr = strArr.flatMap(str => halveStr(str));

	return halvedStrArr.every((str, i) => str === strArr[i]) ?
		false :
		halvedStrArr;
};

/**
 *
 * @param {string} str
 *
 * @param {string[]} qArr
 *
 * @param {{[word: string]: number}} modifier
 */
const splitStrSearchModifier = (str, qArr, modifier = {}) => {
	if (!qArr) {
		return 0;
	}

	let matchCount = 0;

	for (const q of qArr) {
		if (str.toLowerCase().includes(q.toLowerCase())) {
			if (modifier[q]) {
				matchCount += modifier[q];
			} else {
				matchCount++;
			}
		}
	}

	return matchCount + splitStrSearchModifier(
		str,
		halveStrArr(qArr),
		modifier
	);
};

// 8
console.log(splitStrSearchModifier("The hours beach house bloom", [ "Beach The Bloom Hours House" ], { House : 10 }));
console.log(splitStrSearchModifier("a a a a a", [ "a a" ], { a : 120 }));

