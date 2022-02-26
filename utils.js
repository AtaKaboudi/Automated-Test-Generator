const fs = require("fs");

function generateRandomValue(type) {
	//CASE UNDEFINED SELECT RANDOM INT
	if (type == undefined) {
		return Math.floor(Math.random() * 10);
	}
}
function template_match(a, b) {
	if (a.length != b.length) {
		return false;
	}
	for (i = 0; i < a.length; i++) {
		if (a[i].type != b[i]) {
			return false;
		}
	}
	return true;
}
function appendToTestFile(code) {
	fs.writeFile("./testFile.js", code, (err) => {
		console.warn(err);
	});
}

function importCode(path) {
	if (!path) {
		throw new Error("Provide File Path");
	}

	const code = fs.readFileSync(path[0]).toString();
	if (!code) {
		throw new Error("FilePath provided is Empty");
	}
	return code;
}

module.exports = {
	generateRandomValue,
	template_match,
	appendToTestFile,
	importCode,
};
