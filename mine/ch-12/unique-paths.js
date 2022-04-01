const uniquePaths = (rows, cols, memo = { rows: {}, cols: {} }) => {
	if (rows === 1 || cols === 1) return 1;

	if (!memo.rows[rows]) {
		memo.rows[rows] = uniquePaths(rows - 1, cols, memo);
	}

	if (!memo.cols[cols]) {
		memo.cols[cols] = uniquePaths(rows, cols - 1, memo);
	}

	return memo.rows[rows] + memo.cols[cols];
};

console.time("Start");
console.log(uniquePaths(4000, 700));
console.timeEnd("Start");

const uniquePathsStrTempLitVer = (rows, cols, memo = {}) => {
	if (rows === 1 || cols === 1) return 1;

	const key = `${rows}${cols}`;
	if (!memo[key]) {
		memo[key] =
			uniquePathsStrTempLitVer(rows - 1, cols, memo) +
			uniquePathsStrTempLitVer(rows, cols - 1, memo);
	}

	return memo[key];
};

console.time("Start");
console.log(uniquePathsStrTempLitVer(4000, 700));
console.timeEnd("Start");
