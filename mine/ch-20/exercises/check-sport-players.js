/**
 * Desc
 *
 * @typedef {{firstName: string, lastName: string, team:string}[]} SportArr
 *
 */

/**
 * time O(N + M)
 * space O(N + M)
 *
 * @param {SportArr} sportArr1
 *
 * @param {SportArr} sportArr2
 */
const checkSportPlayers = (sportArr1, sportArr2) => {
	// N loop
	const sportArr1Hash = sportArr1.reduce(
		(hash, { firstName, lastName, team }) => {
			hash[`${firstName} ${lastName}`] = team;
			return hash;
		},
		{}
	);

	const playsInTwoSports = [];

	// M loop
	for (const { firstName, lastName } of sportArr2) {
		const currentPlayer = `${firstName} ${lastName}`;
		if (sportArr1Hash[currentPlayer]) {
			playsInTwoSports.push(currentPlayer);
		}
	}

	return playsInTwoSports;
};

const basketballPlayers = [
	{
		firstName : "Jill",
		lastName  : "Huang",
		team      : "Gators"
	},
	{
		firstName : "Janko",
		lastName  : "Barton",
		team      : "Sharks"
	},
	{
		firstName : "Wanda",
		lastName  : "Vakulskas",
		team      : "Sharks"
	},
	{
		firstName : "Jill",
		lastName  : "Moloney",
		team      : "Gators"
	},
	{
		firstName : "Luuk",
		lastName  : "Watkins",
		team      : "Gators"
	}
];

const footballPlayers = [
	{
		firstName : "Hanzla",
		lastName  : "Radosti",
		team      : "32ers"
	},
	{
		firstName : "Tina",
		lastName  : "Watkins",
		team      : "Barleycorns"
	},
	{
		firstName : "Alex",
		lastName  : "Patel",
		team      : "32ers"
	},
	{
		firstName : "Jill",
		lastName  : "Huang",
		team      : "Barleycorns"
	},
	{
		firstName : "Wanda",
		lastName  : "Vakulskas",
		team      : "Barleycorns"
	}
];


console.log(checkSportPlayers(
	basketballPlayers,
	footballPlayers
));
