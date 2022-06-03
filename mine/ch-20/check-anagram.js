/**
 *  # time O(N * M) => N is str1 loop; M is replace? (does replace use loop?)
 *  # space O(1)
 *
 * @param {string} str1
 *
 * @param {string} str2
 *
 * @returns
 */
const checkAnagram = (str1, str2) => {
	if (str1.length !== str2.length) {
		return false;
	}

	for (const char of str1) {
		if (str2 === "") {
			return false;
		}

		str2 = str2.replace(char, "");
	}

	return str2 === "";
};

/**
 *  # time O(N + M) where N is str1.length and M is number of entries in str1Hash
 *  # space atleast O(N + M) where N is str1 as a hash table and M is str2 as a hash table
 *
 * @param {string} str1
 *
 * @param {string} str2
 *
 * @returns
 */
const checkAnagramV2 = (str1, str2) => {
	if (str1.length !== str2.length) {
		return false;
	}

	const str1Hash = {};
	const str2Hash = {};

	for (let i = 0; i < str1.length; i++) {
		str1Hash[str1[i]] = str1Hash[str1[i]] ? str1Hash[str1[i]] + 1 : 1;
		str2Hash[str2[i]] = str2Hash[str2[i]] ? str2Hash[str2[i]] + 1 : 1;
	}

	return Object.entries(str1Hash).every(
		({ char, occ }) => str2Hash[char] === occ
	);
};

const str1 = "keee ee kek";
const str2 = "eke eke kee";

console.log(checkAnagram(str1, str2));
console.log(checkAnagramV2(str1, str2));

