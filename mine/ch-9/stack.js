// Proxy ver
// CMT dont do this, we only want to extend from a class IF WE NEED TO INHERITS ITS PROPS AND METHODS
// NOT AS A WAY TO INDICATE A RELATION
// class Stack extends Array {
// 	constructor(...items) {
// 		super(...items);

// 		return new Proxy(this, {
// 			get(tar) {
// 				return Reflect.get(tar, tar.length - 1);
// 			},
// 			set(tar, i, val) {
// 				tar.push(val);
// 			},
// 			deleteProperty(tar) {
// 				tar.pop();
// 			}
// 		});
// 	}
// }

// const stack = new Stack(1, 2, 3);
// stack.pop();

// console.log(stack);

// console.log(stack[0]);

// stack[1] = "hi";

// console.log(stack);

export class Stack {
	// ES2019 has private fields now cool! This is the easier way instead of using module pattern closure
	#arr;

	constructor(...items) {
		this.#arr = [...items];
	}
	append(...items) {
		this.#arr.concat(items);
	}
	push(item) {
		this.#arr.push(item);
	}
	pop() {
		return this.#arr.pop();
	}
	get read() {
		return this.#arr[this.#arr.length - 1];
	}
	get items() {
		// We need to return a new arr everytime so that they cant access the original #arr
		return Object.freeze([...this.#arr]);
	}
}

// This is the old way of having private fields
// const StackClosure = function (...items) {
// 	const arr = [...items];
// 	console.log(arr);
// };

// const stack = new Stack(1, 2, 3);
// const stack2 = new Stack(1, 2, 3, 4);
// const StackClosurewe = new StackClosure(1, 2, 3);
// console.log(stack.items.push(1));

// console.log(stack.__proto__ === stack2.__proto__);
