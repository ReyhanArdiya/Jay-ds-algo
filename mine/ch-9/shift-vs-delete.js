const hash = {};
const arr = [];

for (let i = 0; i < 1_000_000_00; i++) {
	hash[i] = i;
	arr[i] = i;
}

console.time("hash");
delete hash[0];
console.timeEnd("hash");

console.time("arr");
arr.shift();
console.timeEnd("arr");
