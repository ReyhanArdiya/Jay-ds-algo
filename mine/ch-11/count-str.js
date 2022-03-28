// "abc", "def", "ghi", "j"
const countStr = strArr => {
	if (strArr.length === 1) return strArr[0].length;
	return strArr[0].length + countStr(strArr.slice(1));
};

console.log(countStr(["ab", "c", "def", "ghij"]));
