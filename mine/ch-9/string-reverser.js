import { Stack } from "./stack.js";

// Class Ver
class StringReverser {
	#strStack;
	constructor(str) {
		this.#strStack = new Stack(...str);
	}

	get reversed() {
		const revArr = [];
		while (this.#strStack.read) {
			revArr.push(this.#strStack.pop());
		}
		this.#strStack = new Stack(...revArr);
		return revArr.join("");
	}
}

const reverser = new StringReverser("hello");

console.log(reverser.reversed);
console.log(reverser.reversed);

// Closure ver
const createStrReverser = str => {
	let strStack = new Stack(...str);

	return () => {
		const revArr = [];
		while (strStack.read) {
			revArr.push(strStack.pop());
		}
		strStack = new Stack(...revArr);
		return revArr.join("");
	};
};

const strReverser = createStrReverser("dear");

console.log(strReverser());
console.log(strReverser());

// One Time Func Ver
const reverseStr = str => {
	const strStack = new Stack(...str);
	let revStr = "";
	while (strStack.read) {
		revStr += strStack.pop();
	}
	return revStr;
};

console.log(reverseStr("you say"));
console.log(reverseStr("you say"));

const reverseStrorNum = strOrNumArr => {
	const strStack = new Stack(...strOrNumArr);
	const revArr = [];
	while (strStack.read) {
		revArr.push(strStack.pop());
	}
	return revArr.join("");
};

console.log(reverseStrorNum([1, 2, 3]));
