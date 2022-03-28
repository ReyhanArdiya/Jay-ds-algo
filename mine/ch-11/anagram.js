const generateAnagram = str => {
	if (str.length === 1) return [str[0]];
	const collection = [];
	const substrAnagrams = generateAnagram(str.slice(1));
	for (const substrAnagram of substrAnagrams) {
		for (let i = 0; i <= substrAnagram.length; i++) {
			collection.push(
				`${substrAnagram.slice(0, i)}${str[0]}${substrAnagram.slice(i)}`
			);
		}
	}
	return collection;
};

console.log(generateAnagram("abcd"));
