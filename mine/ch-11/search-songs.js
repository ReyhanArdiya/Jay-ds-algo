import splitStrSearch from "./split-str-search.js";

const DUMMY_SONGS = [
	{
		title: "Araw-araw",
		artist: "Ben&Ben",
		year: 2019,
		desc: "A very good song",
		get summary() {
			return `${this.title} by ${this.artist} ${this.year} ${this.desc}`;
		}
	},
	{
		title: "911",
		artist: "Lady Gaga",
		year: 2020,
		desc: "A very poppy song",
		get summary() {
			return `${this.title} by ${this.artist} ${this.year} ${this.desc}`;
		}
	},
	{
		title: "The Hours",
		artist: "Beach House",
		year: 2011,
		desc: "A very nice song",
		get summary() {
			return `${this.title} by ${this.artist} ${this.year} ${this.desc}`;
		}
	}
];

// CMT These was copilots doing...scary but cool :D
const copilotQuerySortedSongs = (songs, q) => {
	return songs
		.map(song => {
			return {
				song,
				score: splitStrSearch(song.summary, q)
			};
		})
		.sort((a, b) => b.score - a.score);
};

// console.log(copilotQuerySortedSongs(DUMMY_SONGS, "our he"));

const copilotQuerySongs = (songs, q, sort = "asc") => {
	return songs
		.map(song => {
			return {
				song,
				score: splitStrSearch(song.summary, q)
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

// console.log(copilotQuerySongs(DUMMY_SONGS, "911 2020 2011", "asc"));

class SortedArray {
	#arr = [];

	push(val) {
		for (let i = 0; i < this.#arr.length; i++) {
			if (this.#arr[i] > val) {
				this.#arr.splice(i, 0, val);
				return;
			}
		}
		this.#arr.push(val);
	}

	get items() {
		return [...this.#arr];
	}

	read(i) {
		return this.#arr[i];
	}
}

class SortedSongs extends SortedArray {
	#arr = [];

	push(song) {
		for (let i = 0; i < this.#arr.length; i++) {
			if (this.#arr[i].match > song.match) {
				this.#arr.splice(i, 0, song);
				return;
			}
		}

		this.#arr.push(song);
	}

	get items() {
		return [...this.#arr];
	}
}

// CMT its quicker to use copilots version, I just wanted to implement a SortedArray class :P
const querySongs = (songs, q) => {
	const sortedSongs = new SortedSongs();
	for (const song of songs) {
		sortedSongs.push({
			...song,
			match: splitStrSearch(song.summary, q)
		});
	}

	return sortedSongs.items;
};

console.log(querySongs(DUMMY_SONGS, "911"));
