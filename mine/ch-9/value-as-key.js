// console.time("arr");
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// for (const val of arr) {
// 	if (val === 11000) {
// 		console.log(val);
// 		break;
// 	}
// }
// console.timeEnd("arr");

// console.time("hash");
// const hash = {
// 	1: true,
// 	2: true,
// 	3: true,
// 	4: true,
// 	5: true,
// 	6: true,
// 	7: true,
// 	8: true,
// 	9: true,
// 	10: true
// };

// console.log(hash[11000]);
// console.timeEnd("hash");

const numOfEls = 100000000;
const searchFor = 100000000;

// console.time("arr");
// const arr = [];

// for (let i = 0; i < numOfEls; i++) {
// 	arr[i] = i + 1;
// }

// let arrCounter = 0;
// for (const val of arr) {
// 	arrCounter++;
// 	if (val === searchFor) {
// 		console.log(val);
// 		break;
// 	}
// }
// console.timeEnd("arr");

console.time("hash");
const hash = {};

for (let i = 0; i < numOfEls; i++) {
	hash[i + 1] = true;
}

let hashcounter = 0;
hashcounter += 1;
console.log(hash[searchFor]);
console.timeEnd("hash");

console.log(/* arrCounter */ hashcounter);
