/**
 *
 * @param {number[]} stonks
 */
const stonks = stonks => {
	let [ buy ] = stonks;
	let profit = 0;


	for (let i = 1; i < stonks.length; i++) {
		const currentStonk = stonks[i];
		if (currentStonk < buy) {
			buy = currentStonk;
		} else {
			const newProfit = currentStonk - buy;
			if (newProfit > profit) {
				profit = newProfit;
			}
		}
	}


	return profit;
};

const stonks1 = [ 10, 7, 5, 8, 11, 6, 8 ];

console.log(stonks(stonks1));
