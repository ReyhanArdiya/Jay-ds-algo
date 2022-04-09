/*

THIS IS THE WRONG VERSION >:(

*/

import splitStrSearch from "../ch-11/split-str-search.js";

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

// The memo version will only be very helpful if there are multiple of the same word,
// case insensitive, in the str param; e.g.: "The hours the the the".
//
// The memo version will still have the same accuracy as the original version,
// but it's going to reduce the number of loops in the while (halvedQ) part
// of this function by only looping if the word has not been matched before
//
// The time complexity of the while loop for the original version is q.split(" ").length * 6
// The time complexity of the while loop for the memo version is q.split(" ").length * 3
const splitStrSearchMemo = (str, q, _memo = {}) => {
	// The base case will be when the str is an empty array which means we don't have to match anything and just return 0
	if (!str.length) {
		return 0;
	}

	// The str that will be searched splitted into an array
	const seperatedStr = str instanceof Array ? str : str.split(" ");
	const word = seperatedStr[0].toLowerCase();

	// Only loop if the word has not been matched before
	if (!(word in _memo)) {
		let matchCount = 0;
		// The query being halved until it's no longer possible to halve it
		let halvedQ = [ q ];
		while (halvedQ) {
			/*
			DBG use this if you want to know the number of loops in while loop.
			For comparisonal purpose only when comparing with original version
			*/
			// console.log("In Memo While");
			// Match word (which is the only str value we need to care per recursion) againts each query
			for (const query of halvedQ) {
				// CMT The reason why i say this is the wrong version since this
				// we don't actually have to halvedQ everytime, we can just seperate
				// each Q into a single word and match that. Why? since word will
				// always be a single word so it is unnecessary to match it with stuff like "meo meow"
				word.includes(query.toLowerCase()) && matchCount++;
			}

			// Halve the q
			halvedQ = halveStrArr(halvedQ);
		}

		_memo[word] = matchCount;
	}

	// Return the word's matchCount in memo that was calculated in the earlier
	// if or it has already been there from previous recursive calls and sum it
	// with the rest of the words matchCounts
	return _memo[word] + splitStrSearchMemo(seperatedStr.slice(1), q, _memo);
};

// console.log(splitStrSearchMemo("The hours beach house, superSTAR", "superstar", { "superstar" : 1000 }));

/* non memo vs memo */

// res: 8; both cologs 20 times sice each str word is unique
// console.log(
// 	splitStrSearch("The hours beach house bloom", "Beach The Bloom Hours House")
// );
// console.log(
// 	splitStrSearchMemo(
// 		"The hours beach house bloom",
// 		"Beach The Bloom Hours House"
// 	)
// );

// const str = "a a b b c c";
// const query = "x x x";
// console.log(query.split(" ").length * 6);
// console.log(splitStrSearch(str, query)); // cologs: 18 = loop is query.split(" ").length * 6

// console.log(query.split(" ").length * 3);
// console.log(splitStrSearchMemo(str, query)); // cologs: 9 = loop is query.split(" ").length * 3
// export default splitStrSearchMemo;
