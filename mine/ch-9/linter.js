import { Stack } from "./stack.js";

// #region -------------------SEPERATE FUNCTION VER-------------------------------------------------

//  I could throw new Error but i use return so that i can call this multiple times more easily
const lintJS = jsStr => {
	// Make new err stack
	const errStack = new Stack();

	for (const str of jsStr) {
		// Store the popped var here or i could dec them in each case too
		let popped;

		switch (str) {
			// If we encounter an opening thingy we will check for their closing later
			case "(":
			case "[":
			case "{":
				errStack.push(str);
				break;

			case "}":
				popped = errStack.pop();

				// If nothing is popped it means there is no opening tag and its an error
				if (!popped) {
					return "Type #2";
				} else if (popped !== "{") {
					// If the popped value is not the opposite of thie case's closing brace, its an error
					return "Type #3";
				}

				break;

			case "]":
				popped = errStack.pop();

				// If nothing is popped it means there is no opening tag and its an error
				if (!popped) {
					return "Type #2";
				} else if (popped !== "[") {
					// If the popped value is not the opposite of thie case's closing brace, its an error
					return "Type #3";
				}

				break;

			case ")":
				popped = errStack.pop();

				// If nothing is popped it means there is no opening tag and its an error
				if (!popped) {
					return "Type #2";
				} else if (popped !== "(") {
					// If the popped value is not the opposite of thie case's closing brace, its an error
					return "Type #3";
				}

				break;
		}
	}

	// If there is still something in the stack it means there wasn't a closing tag
	// that was able to pop it, so error baeb
	if (errStack.items.length) {
		return "Type #1";
	} else {
		// If all is empty that means each opening has a corresponding closing and its right
		return true;
	}
};

console.time("Functions");
console.log(lintJS("(var x = {y: [1,2,3]})")); // No err
console.log(lintJS("let a = {m: 1")); // 1 no closing
console.log(lintJS("let a = 1]")); // 2 no opening
console.log(lintJS("let a = {m: 1]")); // 3 missmatch
console.timeEnd("Functions");

// #endregion ================SEPERATE FUNCTION VER=================================================

// #region -------------------CLASS VER-------------------------------------------------

class Linter {
	// Make new err stack
	#errStack = new Stack();

	lintJS(jsStr) {
		for (const str of jsStr) {
			// Store the popped var here or i could dec them in each case too
			let popped;

			switch (str) {
				// If we encounter an opening thingy we will check for their closing later
				case "(":
				case "[":
				case "{":
					this.#errStack.push(str);
					break;

				case "}":
					popped = this.#errStack.pop();

					// If nothing is popped it means there is no opening tag and its an error
					if (!popped) {
						return "Type #2";
					} else if (popped !== "{") {
						// If the popped value is not the opposite of thie case's closing brace, its an error
						return "Type #3";
					}

					break;

				case "]":
					popped = this.#errStack.pop();

					// If nothing is popped it means there is no opening tag and its an error
					if (!popped) {
						return "Type #2";
					} else if (popped !== "[") {
						// If the popped value is not the opposite of thie case's closing brace, its an error
						return "Type #3";
					}

					break;

				case ")":
					popped = this.#errStack.pop();

					// If nothing is popped it means there is no opening tag and its an error
					if (!popped) {
						return "Type #2";
					} else if (popped !== "(") {
						// If the popped value is not the opposite of thie case's closing brace, its an error
						return "Type #3";
					}

					break;
			}
		}

		// If there is still something in the stack it means there wasn't a closing tag
		// that was able to pop it, so error baeb
		if (this.#errStack.items.length) {
			return "Type #1";
		} else {
			// If all is empty that means each opening has a corresponding closing and its right
			return true;
		}
	}
}

console.time("Method");
const linter = new Linter();
console.log(linter.lintJS("(var x = {y: [1,2,3]})")); // No err
console.log(linter.lintJS("let a = {m: 1")); // 1 no closing
console.log(linter.lintJS("let a = 1]")); // 2 no opening
console.log(linter.lintJS("let a = {m: 1]")); // 3 missmatch
console.timeEnd("Method");

// #endregion ================CLASS VER=================================================
