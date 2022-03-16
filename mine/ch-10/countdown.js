const countdownWithInterval = (count, interval = 1_000) => {
	// count-- returns count before it was dec.
	console.log(count--);
	// Only call again if count !== 0

	count &&
		// Binding allows us to use the count and interval value from prev scope
		// We need to bind since setTimoute requires a callback fn
		setTimeout(countdownWithInterval.bind(this, count, interval), interval);
};

// countdownWithInterval(10, 500);

const countdownNoInterval = count => {
	console.log(count--);
	count && countdownNoInterval(count);
};

countdownNoInterval(10);
