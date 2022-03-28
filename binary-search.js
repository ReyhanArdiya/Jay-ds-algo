const binarySearchWtihCounter = (arr, target) => {
	let counter = 0;
	let left = 0;
	let right = arr.length - 1;
	while (left <= right) {
		counter++;
		let mid = Math.floor((left + right) / 2);
		if (arr[mid] === target) {
			return [mid, counter];
		} else if (arr[mid] < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	return [-1, counter];
};

console.log(binarySearchWtihCounter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2));

// Write a function to search a specific song from a an array of song objects
// Language: javascript
// Path: binary-search.js
const binarySearchSong = (arr, target) => {
	let left = 0;
	let right = arr.length - 1;
	while (left <= right) {
		let mid = Math.floor((left + right) / 2);
		if (arr[mid].title === target) {
			return arr[mid];
		} else if (arr[mid].title < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	return null;
};

const songs = [
	{
		title: 'All Star',
		artist: 'Smash Mouth',
		duration: '4:05',
	},
	{
		title: 'Hey Ya',
		artist: 'Lil Nas X',
		duration: '3:45',
	},
	{
		title: 'Phenomenal',
		artist: 'Kanye West',
		duration: '4:40',
	},
	{
		title: 'Danger Zone',
		artist: 'Kanye West',
		duration: '4:20',
	},
	{
		title: 'Famous',
		artist: 'Kanye West',
		duration: '3:45',
	},
	{
		title: 'Wild Thoughts',
		artist: 'Kanye West',
		duration: '3:30',
	},
	{
