/**
 * A function that accepts a number of rows
 * and a number of columns, and calculates the number of possible “shortest”
 * paths from the upper-leftmost square to the lower-rightmost square
 *
 * @param {number} rows
 * @param {number} cols
 */
const uniquePaths = (rows, cols, isFirst = true) => {
	if ((isFirst && rows === 1) || (isFirst && cols === 1)) {
		return 1;
	}

	if (rows < cols) {
		return rows !== 1 ? cols + uniquePaths(rows - 1, cols, false) : 0;
	} else {
		return cols !== 1 ? rows + uniquePaths(rows, cols - 1, false) : 0;
	}
};

console.log(uniquePaths(3, 5));
/* 3 x 3 => 6
[s, 0, 0]
[0, 0, 0]
[0, 0, f]
*/

const answer = (rows, columns) => {
	if (rows === 1 || columns === 1) return 1;
	return answer(rows - 1, columns) + answer(rows, columns - 1);
};

console.log(answer(3, 5));
