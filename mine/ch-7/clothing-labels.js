const clothingLabels = shirtArr => {
	return shirtArr.flatMap(shirt => {
		const labels = [];
		for (let i = 1; i <= 5; i++) {
			labels.push(`${shirt} Size: ${i}`);
		}
		return labels;
	});
};

const clothingLabelsV2 = shirtArr => {
	const labels = [];

	for (const shirt of shirtArr) {
		for (let i = 1; i <= 5; i++) {
			labels.push(`${shirt} Size: ${i}`);
		}
	}

	return labels;
};

console.log(clothingLabels(["Purple Shirt", "Green Shirt"]));
console.log(clothingLabelsV2(["Purple Shirt", "Green Shirt"]));
