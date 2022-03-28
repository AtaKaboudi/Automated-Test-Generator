function getInput(n, type) {
	let result = [];
	if (type == "int") {
		for (let i = 0; i < n; i++) {
			result[i] = Math.floor(Math.random() * 100);
		}
		return result;
	}
	if (type == "string") {
		for (let i = 0; i < n; i++) {
			result[i] = Math.floor(Math.random() * 100).toString();
		}
		return result;
	}

	console.log(
		"[INPUT GENERATOR] ERROR: Failed to generate input for type: " + type
	);
	return null;
}

module.exports = { getInput };
