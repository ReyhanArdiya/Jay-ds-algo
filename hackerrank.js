// [0,1,2,1,2,3]

function longestSubarray(arr) {
	if (!arr.length) {
		return 0;
	}

	const subarrays = [];
	for (let i = 0; i < arr.length; i++) {
		const subarr = [];
		const numbers = new Map();
		subarr.push(arr[i]);
		numbers.set(arr[i], true);

		for (let j = i + 1; j < arr.length; j++) {
			numbers.set(arr[j], true);

			if (numbers.size >= 3) {
				break;
			}

			if (Math.abs(arr[i] - arr[j]) === 1 || arr[i] === arr[j]) {
				subarr.push(arr[j]);
			} else {
				break;
			}
		}

		subarrays.push(subarr);
	}

	console.log(subarrays);
	return Math.max(...subarrays.map(arr => arr.length));
}

console.log(longestSubarray([0, 1, 2, 1, 2, 3]));
// console.log(longestSubarray([1, 1, 1, 3, 3, 2, 2]));
// console.log(longestSubarray([0, 1, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1]));
// console.log(longestSubarray([2, 2, 1]));
// console.log(longestSubarray([]));

function mostActive(customers) {
	const totalTrades = customers.length;

	const customersCount = {};
	for (const customer of customers) {
		if (!customersCount[customer]) {
			customersCount[customer] = 1;
		} else {
			customersCount[customer]++;
		}
	}

	const customersPercentages = {};
	for (const [customer, trades] of Object.entries(customersCount)) {
		customersPercentages[customer] = (trades / totalTrades) * 100;
	}

	const activeCustomers = [];
	for (const [customer, trades] of Object.entries(customersPercentages)) {
		if (trades >= 5) {
			activeCustomers.push(customer);
		}
	}

	return activeCustomers.sort();
}

console.log(mostActive(["b", "b", "a", "b"]));
