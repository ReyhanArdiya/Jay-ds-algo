import splitStrSearch from "./split-str-search.js";

/**
 * Allows you to search an array of objects based on a property against a {@link q}
 * @param {any[]} arrOfObjs
 * @param {string} q
 */
const searchWithSSS = (arrOfObjs, whichProp, q, sort = "asc") => {
	return arrOfObjs
		.map(obj => {
			return {
				obj,
				score: splitStrSearch(obj[whichProp], q)
			};
		})
		.sort((a, b) => {
			if (sort === "asc") {
				return a.score - b.score;
			} else {
				return b.score - a.score;
			}
		});
};

const array = [
	{
		text: "Frightened eyes looking back at me, change your mind dont care about me",
		summary: "This is my fight song and shit"
	},
	{
		text: "I'm not a ghost, I'm a real",
		summary: "everything here is real tho"
	},
	{
		text: "Beyond love, the first thing that i do",
		summary: "Girl i think you dropped sumn, mYJAW"
	}
];

console.log(searchWithSSS(array, "text", "beyond love"));
