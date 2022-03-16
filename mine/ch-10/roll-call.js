import Queue from "../ch-9/queue.js";

/**
 * This one requires the use to pass in a Queue
 * @param {Queue} names
 */
const rollCallFromQueue = names => {
	const firstStud = names.dequeue();

	if (firstStud) {
		console.log(firstStud);
		rollCallFromQueue(names);
	} else {
		console.log("All called!");
	}
};

// rollCallFromQueue(new Queue("Adam", "Bea", "colt", "Dephni"));

/**
 * This one allows the user to pass in a string array which will be turned to Queue
 * @param {string[]} names
 */
const rollCallFromArrToQueue = names => {
	// This is to only convert it on the first call, the subsequent calls will use the same Queue from
	// the call before it
	if (names instanceof Array) {
		names = new Queue(...names);
	}
	const firstStud = names.dequeue();

	if (firstStud) {
		console.log(firstStud);
		rollCallFromArrToQueue(names);
	} else {
		console.log("All called!");
	}
};

// rollCallFromArrToQueue(["Adam", "Bea", "colt", "Dephni"]);

const rollCallFromArr = (names, startFrom = 0) => {
	if (startFrom < names.length) {
		console.log(names[startFrom]);
		rollCallFromArr(names, startFrom + 1);
	} else {
		console.log("All called!");
	}
};

rollCallFromArr(["Adam", "Bea", "colt", "Dephni"]);
