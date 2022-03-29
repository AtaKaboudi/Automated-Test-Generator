function getInput(n, type) {
	if (n == 0) {
		return;
	}
	let result = [];
	if (type == "int") {
		for (let i = 0; i < n; i++) {
			result[i] = Math.floor(Math.random() * 100);
		}
		return formatInput(result);
	}
	if (type == "string") {
		for (let i = 0; i < n; i++) {
			result[i] = Math.floor(Math.random() * 100).toString();
		}
		return formatInput(result);
	}

	console.log(
		"[INPUT GENERATOR] ERROR: Failed to generate input for type: " + type
	);
	return null;
}

function formatInput(values) {
	/* transforms array  [1,2,3] to  string "(1,2,3)" */
	let response = "(";
	for (let i = 0; i < values.length; i++) {
		response += values[i];
		if (i != values.length - 1) {
			response += ",";
		}
	}
	return response + ")";
}

module.exports = { getInput };
